from flask import Blueprint, jsonify, request

from app.models import Game, db
from app.forms import GameForm
from app.api.auth_routes import validation_errors_to_error_messages

game_routes = Blueprint("games", __name__)

@game_routes.route('/', methods=['POST'])
def create_game():
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.pgn.data:
            new_game = Game(
                collection_id=form.collection_id.data,
                number=form.number.data,
                pgn=Game.parse_pgn(form.pgn.data)
            )

            db.session.add(new_game)
            db.session.commit()
            return new_game.to_dict()
        else:
            return "Must include valid PGN file for new game!", 400
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
