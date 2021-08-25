from flask import Blueprint, jsonify
from app.models import db, Collection

collection_routes = Blueprint("collections", __name__)

@collection_routes.route('/')
def get_collections():
    collections = Collection.query.all()
    return {
        'collections': [collection.to_dict() for collection in collections]
    }

@collection_routes.route('/<int:id>')
def get_collection_by_id(id):
    collection = Collection.query.get(id)
    return collection.to_dict()