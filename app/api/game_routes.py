from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

from app.models import Game, Collection, db
from app.forms import GameForm
from app.api.auth_routes import validation_errors_to_error_messages

game_routes = Blueprint("games", __name__)

@game_routes.route('/', methods=['POST'])
@login_required
def create_game():
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.pgn.data:
            max_number = Game.query.order_by(db.desc("number")).first().number
            new_game = Game(
                collection_id=form.collection_id.data,
                number=max_number+1,
                pgn=Game.parse_pgn(form.pgn.data)
            )

            db.session.add(new_game)
            db.session.commit()
            return new_game.to_dict()
        else:
            return "Must include valid PGN file for new game!", 400
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@game_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_game(id):
    deleted_game = Game.query.get(id)
    if deleted_game:
        if deleted_game.collection.owner_id == current_user.id:
            collection = Collection.query.filter(Collection.id == deleted_game.collection_id).first()
            game_list = filter(lambda game: game.number > deleted_game.number, collection.games)
            for game in game_list:
                game.number -= 1

            db.session.delete(deleted_game)
            db.session.commit()
            return collection.to_dict()
        else:
            return "You do not own that game that you are trying to delete.", 401
    else:
        return "The game that you are trying to delete was not found.", 404


@game_routes.route('/<int:id>/number', methods=['PATCH'])
@login_required
def shift_game(id):
    shifted_game = Game.query.get(id)
    if shifted_game:
        if shifted_game.collection.owner_id == current_user.id:
            direction = request.get_json()
            collection = Collection.query.filter(Collection.id == shifted_game.collection_id).first()
            if direction == "up":
                if shifted_game.number != 1:
                    game_above = Game.query.filter(Game.number == shifted_game.number - 1, Game.collection_id == shifted_game.collection_id).first()
                    [game_above.number, shifted_game.number] = [shifted_game.number, game_above.number]
                    db.session.commit()
                else:
                    return "Game is already at the top of the list.", 400
            if direction == "down":
                print(max(collection.games, key=lambda game: game.number).number)
                if shifted_game.number != max(collection.games, key=lambda game: game.number).number:
                    print("SHIFTED GAME NUMBER ---------", shifted_game.number)
                    game_below = Game.query.filter(Game.number == shifted_game.number + 1, Game.collection_id == shifted_game.collection_id).first()
                    [game_below.number, shifted_game.number] = [shifted_game.number, game_below.number]
                    db.session.commit()
                else:
                    return "Game is already at the bottom of the list.", 400
            return collection.to_dict()
        else:
            return "You do not own the game that you are trying to shift.", 401
    else:
        return "The game that you are trying to shift was not found.", 404