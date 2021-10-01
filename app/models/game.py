import chess.pgn
import io

from app.models import db

class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.id'), nullable=False)
    pgn = db.Column(db.Text, nullable=False)
    number = db.Column(db.Integer, nullable=False)

    collection = db.relationship("Collection", back_populates="games", lazy=True)
    annotations = db.relationship("Annotation", backref="games", lazy=False)

    @staticmethod
    def parse_pgn(pgn):
        pgn_parsable = io.TextIOWrapper(pgn)
        game = chess.pgn.read_game(pgn_parsable)
        exporter = chess.pgn.StringExporter(headers=True, variations=False, comments=False)
        pgn_string = game.accept(exporter)
        return pgn_string

    def to_dict(self):
        return {
            "id": self.id,
            "collection_id": self.collection_id,
            "number": self.number,
            "game": self.pgn,
            "collection_num_games": len(self.collection.games),
            "collection_name": self.collection.name
        }