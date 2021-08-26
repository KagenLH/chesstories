import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.config import Config
from app.aws_s3 import *
from app.models import db, Collection
from app.forms import CollectionForm

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
    return collection.to_dict()


@collection_routes.route('/', methods=['POST'])
@login_required
def create_collection():
    """
    Posts a new collection to the database
    """
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.preview_image)
