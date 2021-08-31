from app.models import db, Game

def seed_games():
    fischer_1 = Game(
        collection_id=2,
        number=1,
        pgn='''[Event "Bled-Zagreb-Belgrade Candidates"]
[Site "Bled, Zagreb & Belgrade YUG"]
[Date "1959.10.22"]
[Round "25"]
[White "Svetozar Gligoric"]
[Black "Robert James Fischer"]
[Result "1/2-1/2"]
[BlackElo "?"]
[ECO "B99"]
[EventDate "1959.09.07"]
[PlyCount "114"]
[WhiteElo "?"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3
Qc7 9. O-O-O Nbd7 10. g4 b5 11. Bxf6 gxf6 12. f5 Ne5 13. Qh3 O-O 14. Nce2 Kh8
15. Nf4 Rg8 16. Rg1 d5 17. fxe6 dxe4 18. Nd5 Qc5 19. Nxe7 Qxe7 20. Nf5 Qxe6 21.
Qh6 Bd7 22. Rd6 Nxg4 23. Rxg4 Qxf5 24. Rxg8+ Rxg8 25. Rxf6 Qd5 26. Rd6 Qf5 27.
Rf6 Qg5+ 28. Qxg5 Rxg5 29. Rxf7 Bg4 30. Kd2 Bf3 31. Ke3 Rg1 32. Bh3 Re1+ 33.
Kf4 Bd1 34. Ke5 e3 35. Bf5 Rg1 36. Rxh7+ Kg8 37. Rc7 Bg4 38. Bxg4 Rxg4 39. Rc3
e2 40. Re3 Rg2 41. Kd4 e1=Q 42. Rxe1 Rxc2 43. Rb1 Kf7 44. a3 Ke6 45. b3 Rxh2
46. Kc5 Kd7 47. Kb6 Ra2 48. Kxa6 Rxa3+ 49. Kb7 Kd6 50. Kb6 Kd7 51. b4 Rh3 52.
Rc1 Rh8 53. Kxb5 Rb8+ 54. Ka4 Ra8+ 55. Kb3 Rc8 56. Rxc8 Kxc8 57. Kc4 Kb8
1/2-1/2'''
    )

    fischer_2 = Game(
        collection_id=2,
        number=3,
        pgn='''[Event "Mar del Plata"]
[Site "Mar del Plata ARG"]
[Date "1960.03.30"]
[Round "2"]
[White "Boris Spassky"]
[Black "Robert James Fischer"]
[Result "1-0"]
[BlackElo "?"]
[ECO "C39"]
[EventDate "1960.03.29"]
[PlyCount "57"]
[WhiteElo "?"]

1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6 7. Nd3 Nxe4 8. Bxf4
Bg7 9. Nc3 Nxc3 10. bxc3 c5 11. Be2 cxd4 12. O-O Nc6 13. Bxg4 O-O 14. Bxc8 Rxc8
15. Qg4 f5 16. Qg3 dxc3 17. Rae1 Kh8 18. Kh1 Rg8 19. Bxd6 Bf8 20. Be5+ Nxe5 21.
Qxe5+ Rg7 22. Rxf5 Qxh4+ 23. Kg1 Qg4 24. Rf2 Be7 25. Re4 Qg5 26. Qd4 Rf8 27.
Re5 Rd8 28. Qe4 Qh4 29. Rf4 1-0'''
    )

    fischer_3 = Game(
        collection_id=2,
        number=5,
        pgn='''[Event "Bled"]
[Site "Bled YUG"]
[Date "1961.09.30"]
[Round "18"]
[White "Robert James Fischer"]
[Black "Tigran Vartanovich Petrosian"]
[Result "1-0"]
[BlackElo "?"]
[ECO "B17"]
[EventDate "1961.09.03"]
[PlyCount "71"]
[WhiteElo "?"]

1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Nf3 Ngf6 6. Nxf6+ Nxf6 7. Bc4 Bf5
8. Qe2 e6 9. Bg5 Bg4 10. O-O-O Be7 11. h3 Bxf3 12. Qxf3 Nd5 13. Bxe7 Qxe7 14.
Kb1 Rd8 15. Qe4 b5 16. Bd3 a5 17. c3 Qd6 18. g3 b4 19. c4 Nf6 20. Qe5 c5 21.
Qg5 h6 22. Qxc5 Qxc5 23. dxc5 Ke7 24. c6 Rd6 25. Rhe1 Rxc6 26. Re5 Ra8 27. Be4
Rd6 28. Bxa8 Rxd1+ 29. Kc2 Rf1 30. Rxa5 Rxf2+ 31. Kb3 Rh2 32. c5 Kd8 33. Rb5
Rxh3 34. Rb8+ Kc7 35. Rb7+ Kc6 36. Kc4 1-0'''
    )

    fischer_4 = Game(
        collection_id=2,
        number=7,
        pgn='''[Event "USA-ch"]
[Site "New York, NY USA"]
[Date "1965.12.27"]
[Round "10"]
[White "Robert James Fischer"]
[Black "Nicolas Rossolimo"]
[Result "1-0"]
[BlackElo "?"]
[ECO "C12"]
[EventDate "?"]
[PlyCount "63"]
[WhiteElo "?"]

1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3 7. bxc3 Ne4 8. Qg4
g6 9. Bd3 Nxd2 10. Kxd2 c5 11. Nf3 Nc6 12. Qf4 Qc7 13. h4 f5 14. g4 cxd4 15.
cxd4 Ne7 16. gxf5 exf5 17. Bb5+ Kf8 18. Bd3 Be6 19. Ng1 Kf7 20. Nh3 Rac8 21.
Rhg1 b6 22. h5 Qc3+ 23. Ke2 Nc6 24. hxg6+ Kg7 25. Rad1 Nxd4+ 26. Kf1 Rhe8 27.
Rg3 Nc6 28. Qh4 Nxe5 29. Nf4 Ng4 30. Nxe6+ Rxe6 31. Bxf5 Qc4+ 32. Kg1 1-0'''
    )

    fischer_5 = Game(
        collection_id=2,
        number=2,
        pgn='''[Event "Bled-Zagreb-Belgrade Candidates"]
[Site "Bled, Zagreb & Belgrade YUG"]
[Date "1959.10.29"]
[Round "28"]
[White "Vasily Smyslov"]
[Black "Robert James Fischer"]
[Result "0-1"]
[BlackElo "?"]
[ECO "B99"]
[EventDate "1959.09.07"]
[PlyCount "108"]
[WhiteElo "?"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3
Qc7 9. O-O-O Nbd7 10. g4 b5 11. Bxf6 Nxf6 12. g5 Nd7 13. Bh3 b4 14. Nce2 Bb7
15. Kb1 Nc5 16. Ng3 d5 17. f5 dxe4 18. Qg4 exf5 19. Ndxf5 g6 20. Nxe7 Qxe7 21.
Qf4 O-O 22. Rd6 Rad8 23. Rf6 Rd5 24. Bg4 Nd7 25. Rf1 e3 26. b3 Rd2 27. Bxd7
Rxd7 28. Re1 Re8 29. h4 Qc5 30. Qc4 Qxc4 31. bxc4 Rd4 32. c5 Rxh4 33. c6 Bc8
34. Rd6 Rc4 35. Kb2 Kg7 36. Kb3 Rg4 37. Ne2 Re6 38. Red1 Rg2 39. Nf4 Rxd6 40.
Rxd6 Rd2 41. Rd3 Rf2 42. Rd4 e2 43. Nd3 Bf5 44. c7 Rf3 45. c8=Q Bxc8 46. Re4
Bf5 47. Rxe2 Bxd3 48. cxd3 Rxd3+ 49. Kxb4 Rd5 50. Rg2 h6 51. gxh6+ Kxh6 52. a4
g5 53. Rc2 Rd6 54. Kc5 Re6 0-1'''
    )

    fischer_6 = Game(
        collection_id=2,
        number=6,
        pgn='''[Event "Monte Carlo"]
[Site "Monte Carlo MNC"]
[Date "1967.04.04"]
[Round "11"]
[White "Robert James Fischer"]
[Black "Efim Geller"]
[Result "0-1"]
[BlackElo "?"]
[ECO "B97"]
[EventDate "1967.03.24"]
[PlyCount "50"]
[WhiteElo "?"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6 8. Qd2
Qxb2 9. Rb1 Qa3 10. f5 Nc6 11. fxe6 fxe6 12. Nxc6 bxc6 13. e5 Nd5 14. Nxd5 cxd5
15. Be2 dxe5 16. O-O Bc5+ 17. Kh1 Rf8 18. c4 Rxf1+ 19. Rxf1 Bb7 20. Bg4 dxc4
21. Bxe6 Qd3 22. Qe1 Be4 23. Bg4 Rb8 24. Bd1 Kd7 25. Rf7+ Ke6 0-1'''
    )

    fischer_7 = Game(
        collection_id=2,
        number=4,
        pgn='''[Event "Bled"]
[Site "Bled YUG"]
[Date "1961.09.04"]
[Round "2"]
[White "Robert James Fischer"]
[Black "Mikhail Tal"]
[Result "1-0"]
[BlackElo "?"]
[ECO "B47"]
[EventDate "1961.09.03"]
[PlyCount "93"]
[WhiteElo "?"]

1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e6 5. Nc3 Qc7 6. g3 Nf6 7. Ndb5 Qb8 8.
Bf4 Ne5 9. Be2 Bc5 10. Bxe5 Qxe5 11. f4 Qb8 12. e5 a6 13. exf6 axb5 14. fxg7
Rg8 15. Ne4 Be7 16. Qd4 Ra4 17. Nf6+ Bxf6 18. Qxf6 Qc7 19. O-O-O Rxa2 20. Kb1
Ra6 21. Bxb5 Rb6 22. Bd3 e5 23. fxe5 Rxf6 24. exf6 Qc5 25. Bxh7 Qg5 26. Bxg8
Qxf6 27. Rhf1 Qxg7 28. Bxf7+ Kd8 29. Be6 Qh6 30. Bxd7 Bxd7 31. Rf7 Qxh2 32.
Rdxd7+ Ke8 33. Rde7+ Kd8 34. Rd7+ Kc8 35. Rc7+ Kd8 36. Rfd7+ Ke8 37. Rd1 b5 38.
Rb7 Qh5 39. g4 Qh3 40. g5 Qf3 41. Re1+ Kf8 42. Rxb5 Kg7 43. Rb6 Qg3 44. Rd1 Qc7
45. Rdd6 Qc8 46. b3 Kh7 47. Ra6 1-0'''
    )

    db.session.add(fischer_1)
    db.session.add(fischer_2)
    db.session.add(fischer_3)
    db.session.add(fischer_4)
    db.session.add(fischer_5)
    db.session.add(fischer_6)
    db.session.add(fischer_7)
    db.session.commit()

def undo_games():
    db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
    db.session.commit()