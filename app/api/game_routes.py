from flask import Blueprint, jsonify, request

game_routes = Blueprint("games", __name__)

@game_routes.route('/', methods=['POST'])
def create_game():
    pass