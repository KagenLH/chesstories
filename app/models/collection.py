from app.models import db

class Collection(db.Model):
    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(70), nullable=False)
    description = db.Column(db.Text, nullable=False)
    preview_url = db.Column(db.Text)
    banner_url = db.Column(db.Text)

    owner = db.relationship("User", backref="collections", lazy=True)
    games = db.relationship("Game", back_populates="collection", lazy=True, cascade="all,delete")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'preview_url': self.preview_url,
            'banner_url': self.banner_url,
            'owner': self.owner.username,
            'games': sorted([game.to_dict() for game in self.games], key=lambda game: game['number'])
        }
    
    def get_games(self):
        return self.games