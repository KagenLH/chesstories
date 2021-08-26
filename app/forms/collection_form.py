from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_uploads import UploadSet, IMAGES

images = UploadSet('images', IMAGES)

class CollectionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    preview_image = FileField('preview_image', validators=[FileAllowed(images, 'You can only upload images for your preview')])
