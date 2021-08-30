import chess.pgn

from app.models import db

class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.id'), nullable=False)
    pgn = db.Column(db.Text, nullable=False)
    number = db.Column(db.Integer, nullable=False)

    collection = db.relationship("Collection", backref="games", lazy=True)

    @staticmethod
    def parse_pgn(pgn):
        game = chess.pgn.read_game(pgn)
        exporter = chess.pgn.StringExporter(headers=True, variations=False, comments=False)
        pgn_string = game.accept(exporter)
        return pgn_string

    def to_dict(self):
        return {
            "id": self.id,
            "collection_id": self.collection_id,
            "number": self.number,
            "game": self.pgn
        }