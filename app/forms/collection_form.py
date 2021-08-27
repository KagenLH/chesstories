from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class CollectionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=70)])
    description = StringField('description', validators=[DataRequired()])
    preview_image = FileField('preview_image', validators=[FileAllowed(['jpg', 'png', 'jpeg'], 'You can only upload images for your preview')])
