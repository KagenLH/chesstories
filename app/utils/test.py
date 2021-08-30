import chess.pgn
import os

def parse_pgn(pgn):
    game = chess.pgn.read_game(pgn)
    exporter = chess.pgn.StringExporter(headers=True, variations=False, comments=False)
    pgn_string = game.accept(exporter)
    print(pgn_string)

pgn = open('mamedyarov_artemiev_2021.pgn')
parse_pgn(pgn)