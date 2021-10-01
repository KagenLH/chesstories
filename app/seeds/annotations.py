from app.models import db, Annotation

def seed_annotations():
    annotations = [
        Annotation(
            game_id=1,
            ply_num=0,
            content=
            '''Despite the importance of the occasion, this being a match for the Championship of Cuba, the 12-year-old Capablanca breezes through the entire game in phenomenally quick time, taking only 24 minutes for the entire 59 moves, an average of less than half a minute per move!
                The two players whizz through the opening, skip the midgame, and arrive at the ending in less than 20 moves!
                    The ending is absorbing enough, though, to make up for anything else that is lacking.'''
        ),
        Annotation(
            game_id=1,
            ply_num=2,
            content=
            '''The Dutch Defense has been favoured by aggressive players, from Morphy to Alekhine. Morphy won two beautiful games from Harrwitz with the Dutch, demonstrating in each of them incidentally his skill in the endgame.'''
        ),
        Annotation(
            game_id=1,
            ply_num=7,
            content=
            '''White has a good alternative here in the Staunton Gambit, beginning with 4 f2-f3, when they play might go as follows: 4 ... e4xf3 5 Ng1xf3 g7-g6 6 Bf1-d3!, and 7 h2-h4 followed by 8 h4-h5 offers prospects of an attack for the Pawn.'''
        )
    ]

    for annotation in annotations:
        db.session.add(annotation)
    db.session.commit()
def undo_annotations():
    db.session.execute('TRUNCATE annotations RESTART IDENTITY CASCADE;')
    db.session.commit()