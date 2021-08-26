import boto3
import botocore
from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user

from app.config import Config
from app.aws_s3 import *
from app.models import db, Collection
from app.forms import CollectionForm
from app.api.auth_routes import validation_errors_to_error_messages

collection_routes = Blueprint("collections", __name__)


@collection_routes.route('/')
@login_required
def get_collections():
    collections = Collection.query.all()
    return {
        'collections': [collection.to_dict() for collection in collections]
    }


@collection_routes.route('/<int:id>')
@login_required
def get_collection_by_id(id):
    collection = Collection.query.get(id)
    if collection:
        return collection.to_dict()
    else:
        return "A collection with that ID doesn't exist."


@collection_routes.route('/<int:id>/banner', methods=["PATCH"])
@login_required
def change_banner_image(id):
    collection = Collection.query.get(id)
    if collection:
        banner_image = request.files['banner_image']
        if banner_image:
            banner_url = upload_file_to_s3(banner_image, Config.S3_BUCKET)
            collection.banner_url = banner_url
            db.session.commit()
            return collection.to_dict()
        else:
            return "No image sent to the server.", 400
    else:
        return "A collection with that ID doesn't exist.", 400


@collection_routes.route('/', methods=['POST'])
@login_required
def create_collection():
    """
    Posts a new collection to the database
    """
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.preview_image.data:
            image_url = upload_file_to_s3(form.preview_image.data, Config.S3_BUCKET)
            new_collection = Collection(
                owner_id=current_user.id,
                name=form.name.data,
                description=form.description.data,
                preview_url=image_url
            )
            
            db.session.add(new_collection)
            db.session.commit()
            return new_collection.to_dict()
        else:
            new_collection = Collection(
                owner_id=current_user.id,
                name=form.name.data,
                description=form.description.data,
            )
            
            db.session.add(new_collection)
            db.session.commit()
            return new_collection.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@collection_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_collection(id):
    """
    Updates a collection in the database
    """
    collection = Collection.query.get(id)
    if collection and collection.owner_id == current_user.id:
        form = CollectionForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if form.preview_image.data:
                # Upload the image to AWS and get back the image URL
                image_url = upload_file_to_s3(form.preview_image.data, Config.S3_BUCKET)
                # Make changes to the collection data
                collection.name = form.name.data
                collection.description = form.description.data
                collection.preview_url = image_url

                db.session.commit()
                return collection.to_dict()
            else:
                collection.name = form.name.data
                collection.description = form.description.data

                db.session.commit()
                return collection.to_dict()
        else:
            return { 'errors': validation_errors_to_error_messages(form.errors) }, 400

    else:
        return "You do not own the collection you are attempting to change.", 403


@collection_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def destroy_collection(id):
    collection = Collection.query.get(id)
    if collection and collection.owner_id == current_user.id:
        db.session.delete(collection)
        db.session.commit()
        return "Successfully deleted collection."
    else:
        return "You do not own the collection you are attempting to delete.", 403
