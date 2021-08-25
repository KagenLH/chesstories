from app.models import db, Collection

def seed_collections():
    capa_1 = Collection(
        owner_id=1,
        name='Greatest Endgames of José Raul Capablanca',
        description=
        '''
            J.R. Capablanca was one of the greatest endgame players of all
        time, and undoubtably the most natural. The ease and elegance with which he played
        in the final phase of the game has been the subject of analysis and admiration until
        today.

            His endgame style was rooted in very simple and unremarkable individual moves that as a 
        sum amounted to a beautiful sequence that left his opponents with no counterplay and lifeless
        positions. Explore this collection of some of his best and most memorable endgame performances
        and appreciate the beauty of the genius J.R. Capablanca. This collection will progress in chronological
        order starting from the earliest games of his career (including a rout of a respected master at the age of 12!)
        through to the end of his career.
        '''
    )

    db.session.add(capa_1)
    db.session.commit()

def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()