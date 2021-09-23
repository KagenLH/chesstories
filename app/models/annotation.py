from app.models import db

class Annotation(db.Model):
    __tablename__ = 'annotations'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    ply_num = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'ply_num': self.ply_num,
            'content': self.content
        }