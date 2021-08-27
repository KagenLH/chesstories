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
        ''',
        banner_url="https://chesstories.s3.amazonaws.com/capa-banner.jpg",
        preview_url="https://chesstories.s3.amazonaws.com/capablanca.jpg"
    )

    fischer_1 = Collection(
        owner_id=1,
        name="Selections from Bobby Fischer's \"My 60 Memorable Games\"",
        description=
        '''
                Bobby Fischer was an American-born chess master who became the youngest grandmaster in history when he received the title in 1958. His youthful intemperance and brilliant playing drew the attention of the American public to the game of chess, particularly when he won the world championship in 1972.

                Fischer learned the moves of chess at age six. He attracted international attention in 1956 with a stunning victory over Donald Byrne at a tournament in New York City. In what was dubbed the “Game of the Century,” Fischer sacrificed his queen on the 17th move to Byrne to set up a devastating counterattack that led to checkmate. At age 16 he dropped out of high school to devote himself fully to the game. In 1958 he won the first of eight American championships. He became the only player ever to earn a perfect score at an American championship, winning all 11 games in the 1964 tournament.
                In 1969 (3 years before he would win the world championship) Fischer published "My 60 Memorable Games", a collection of Fischer's favorite games from his career to that point that he himself annotated. This book is widely regarded as one of the best collections of annotated chess games around, and this collection will explore a curated selection of those games.
                Fischer is known for his sensational and aggressive attacking play style, favoring sharp Sicilian lines as black and advancing the theory of the King's Gambit for white. But more than anything, Fischer was concerned with accuracy and precision. Fischer would not play a line he believed to be dubious or incorrect because it lead to sharp positions, and his preference for sharp positions perhaps resulted from the accuracy that such positions require to play.
                Grab a snack, kick back, and indulge in some of Fischer's finest games from the early portion of his career, a period that included becoming the first ever (and the only person since) to finish with a perfect score at an American championship.
        ''',
        banner_url="https://chesstories.s3.amazonaws.com/fischer_banner.jpg",
        preview_url="https://chesstories.s3.amazonaws.com/fischer_preview.jpg"
    )

    najdorf = Collection(
        owner_id=2,
        name="7 Great Games in the Najdorf Sicilian",
        description=
        '''
        The Sicilian Najdorf (Miguel Najdorf, for whom this opening is named, pictured to the left) is the most popular and best scoring opening played against 1.e4. It can be found everywhere from a local chess club to the world championship level. All time great players Bobby Fischer and Garry Kasparov occasionally used this opening in the most crucial games.
        It is known for resulting in sharp and exciting positions where each side has a great chance to win. Its a common choice in situations where black must win and cannot afford a draw, or for players that dislike simple positions.
        Every chess player needs to be familiar with the Najdorf Sicilian, not only because it is the best scoring response to 1.e4, but also because it is a classic that everyone should know. The Najdorf Sicilian to a chess player is like Bach to a musician. With that said, let’s take a look at 7 great games played from this opening!
        ''',
        banner_url="https://chesstories.s3.amazonaws.com/najdorf_banner.jpg",
        preview_url="https://chesstories.s3.amazonaws.com/najdorf_preview.jpg"
    )

    db.session.add(capa_1)
    db.session.add(fischer_1)
    db.session.add(najdorf)
    db.session.commit()

def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()