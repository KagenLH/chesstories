from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import IntegerField
from wtforms.validators import DataRequired

from app.models import db, Collection


class GameForm(FlaskForm):
    collection_id = IntegerField('collection_id')
    number = IntegerField('number')
    pgn = FileField('pgn', validators=[FileAllowed(['pgn'], 'You can only upload PGN files for your game')])