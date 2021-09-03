# Table of Contents

 1. [Introduction](https://github.com/KagenLH/chesstories#introduction)
 2. [Technologies](https://github.com/KagenLH/chesstories#technologies)
 3. [Relevant Documents](https://github.com/KagenLH/chesstories#relevant-documents)
 4. [Running ChesStories on Your Local Machine](https://github.com/KagenLH/chesstories#running-chesstories-on-your-local-machine)
 5. [Technical Challenges and Implementation Details](https://github.com/KagenLH/chesstories#technical-challenges-and-implementation-details)
 6. [Future Plans](https://github.com/KagenLH/chesstories#future-plans)
## Introduction

ChesStories is a platform for exploring, creating, and sharing collections of chess games that share a common theme (games of a famous player, games from a certain tournament, opening, world championship match, etc.) built on Flask with React/Redux. Each collection is collected, curated, and annotated move-by-move --- by hand -- by the person that creates the collection.  Other users can then find their collection and play through the games within with the annotations from the curator of the collection. 

You can visit ChesStories [here](https://chesstories.herokuapp.com/).

## Technologies
* Flask
* SQLAlchemy
* PostgreSQL
* AWS S3
* React
* Redux
* Docker (for production deployment)
* Pure CSS (no libraries or extensions)

## Relevant Documents
* [Database Schema](https://github.com/KagenLH/chesstories/wiki/Database-Schema)
* [User Stories](https://github.com/KagenLH/chesstories/wiki/User-Stories)
* [Feature List](https://github.com/KagenLH/chesstories/wiki/Feature-List)
* [API Routes](https://github.com/KagenLH/chesstories/wiki/API-Routes)
* [Frontend Routes](https://github.com/KagenLH/chesstories/wiki/Frontend-Routes)

## Navigating and Using ChesStories

#### Landing and Logging in
When you first navigate to the [website](https://chesstories.herokuapp.com/) you will be met with this splash screen

![chesstories herokuapp com_ (1)](https://user-images.githubusercontent.com/5733445/132007598-79aa77bb-af62-4a2f-b670-86c9c59afa3c.png)

ChesStories requires an account for all activity on the platform, so the only way to advance from here is to login or create an account. If you already have an account or would like to test with the provided demo user, you can click on the login link and interact with the authentication modal accordingly

![chesstories herokuapp com_ (6)](https://user-images.githubusercontent.com/5733445/132008106-d38faf77-f2c7-4304-91ae-b0f8bdc3194b.png)

#### Visiting Collections
Once you are logged in, you will be directed to the collections page, with available curated collections laid out in cards that you can click on to visit any of the collections:

![chesstories herokuapp com_ (7)](https://user-images.githubusercontent.com/5733445/132008336-30e3f15d-f32e-48aa-bf11-4b4d5ab39c50.png)

Clicking on any of the cards will bring you to the page for that collection, which will provide a full description and other information about the collection such as who curated it, how many games are in the collection, and more.

![chesstories herokuapp com_ (8)](https://user-images.githubusercontent.com/5733445/132008971-e81a8ca2-bed5-4d00-97f9-d8ff46a18b99.png)

If you own the collection you'll also see icons for editing or deleting your collection, clicking the delete icon will delete the collection immediately and bring you back to the collection cards page while clicking on the edit icon will change the collection information pane into an edit collection form where you can change the banner image and any other information about your collection

![chesstories herokuapp com_ (9)](https://user-images.githubusercontent.com/5733445/132009431-e9e7baff-37ec-464b-a714-23945693c2dd.png)

#### Adding, Removing, and Reordering Games in your Collections
If you own a collection, you will see a button at the bottom of the information pane that reads "Add or Change Games in this Collection". If you click on it you will be presented with a table that shows all games in your collection in the order of their place in the collection (the order that a user would play through them in). 

![chesstories herokuapp com_ (10)](https://user-images.githubusercontent.com/5733445/132009947-bcf6b3c0-78a0-46e5-9d8c-85ea89eca845.png)

Here you can add a new game to your collection, and then use the arrows to place it into the position in the collection that you would like. Adding a game to a collection only consists of uploading a PGN file and clicking the "Add New Game" button. After adding "Fischer vs Rossolimo, USA Championship 1966" to the collection above and moving it to the 3rd position in the collection my collection now looks like this:

![chesstories herokuapp com_ (11)](https://user-images.githubusercontent.com/5733445/132010526-9617bf47-2ee7-426a-98ec-360597cfe282.png)

You can also click on the trash icons next to any game which will remove the game from the collection, and the order of the games in the collection will adjust accordingly.

#### Exploring Games in a Collection
Once you're ready to start experiencing a collection, you can click on the "Start Collection" button on the bottom of the information pane for the collection. Doing so will bring you to a page that looks like this:

![chesstories herokuapp com_ (13)](https://user-images.githubusercontent.com/5733445/132011064-e42f0fea-4cdc-4d42-9a7d-f8bd7843d80c.png)

You can now start clicking on the forward arrow to play back through the moves of the game, and the back arrow to undo a move if you moved through the moves too quickly.

![chesstories herokuapp com_ (14)](https://user-images.githubusercontent.com/5733445/132011457-83a0e060-e04b-4ab8-8395-29d46e3dd68c.png)

Once you're done with a game and ready to move on, you can click on the next arrow and it will clear the board and take you to the next game in the collection, where you can start again and experience that game as well.

![chesstories herokuapp com_ (15)](https://user-images.githubusercontent.com/5733445/132011691-879b72d6-0a7d-4abb-b820-3022f662f778.png)


## Running ChesStories on Your Local Machine
Running ChesStories in development requires a Python pipenv installation for installing Flask, SQLAlchemy, and other backend dependencies, a pre-existing PostgreSQL installation, and NodeJS for the React environment. These instructions will assume that you already have all of these already installed and configured. Also assure ahead of time that no other processes are running on port 5000.

Navigate in your terminal to wherever you wish to install and run:

`git clone https://github.com/KagenLH/chesstories.git`

After the repository is downloaded, we're ready to install dependencies:
```bash
cd chesstories
pipenv install
```

If running the install didn't automatically put you into the virtual shell, go ahead and do so.
```
pipenv shell
```

Now install dependencies for the React App:
```bash
cd react-app
npm install
```

After that completes, we need to setup our environment variables for development. Create a `.env`
 file in the root of the project and copy these values in:
 ```
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=reallysecretkey
DATABASE_URL=postgresql://chesstories_app@localhost/chesstories_development
```
You can either keep these values exactly as they are for local development, or adjust them according to your judgement. If you change them, you'll need to adjust the Postgres commands we use when creating the database in the next step accordingly. This application uses AWS S3 to store user-uploaded photos. If you have your own S3 bucket you can put in the following extra lines into your `.env` to configure it to use your own S3 bucket:
```
S3_BUCKET_NAME=<YOUR BUCKET NAME>
S3_BUCKET_KEY=<YOUR BUCKET KEY>
S3_SECRET_ACCESS_KEY=<YOUR SECRET KEY VALUE>
```
Now we need to create the development database and database user for the application. Start with opening Postgres CLI
```
psql
```

Create the Postgres user:
`CREATE USER chesstories_app WITH PASSWORD 'password' CREATEDB;`

Now create the development database:
`CREATE DATABASE chesstories_development WITH OWNER chesstories_app;`

If you put different values in your `.env` adjust these commands accordingly.

Now we can upgrade and seed our development database. This application uses alembic to handle migrations and database upgrades, and builds in custom Flask CLI commands for seeding. Upgrade and seed with these commands:

```
flask db upgrade
flask seed all
```
Now everything is configured, and you're ready to start up your development environment! First start up the API server by running from the root of the project:

`flask run`

Now from another terminal window starting from the root, change to the directory with the React server
```bash
cd react-app
```

Then start the React development server:
```
npm start
```

A new browser window with the application will open automatically, and the development environment is ready!

## Technical Challenges and Implementation Details
One of the early and most difficult challenges I faced was how to save, transfer, manipulate, and provide replay ability for chess games that are user uploadable. A long-existing tried and true solution to this problem is the PGN file format, a text file that provides meta-information about the game (who was playing, when, where, and what date) as well as the actual moves of the game itself.  PGNs are made for being readable by humans but also easily parseable by machines and easy for machines to generate. Any PGN will look about like this:
```[Event "USA-ch"]
[Site "New York, NY USA"]
[Date "1965.12.27"]
[EventDate "?"]
[Round "10"]
[Result "1-0"]
[White "Robert James Fischer"]
[Black "Nicolas Rossolimo"]
[ECO "C12"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "63"]

1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3
7. bxc3 Ne4 8. Qg4 g6 9. Bd3 Nxd2 10. Kxd2 c5 11. Nf3 Nc6
12. Qf4 Qc7 13. h4 f5 14. g4 cxd4 15. cxd4 Ne7 16. gxf5 exf5
17. Bb5+ Kf8 18. Bd3 Be6 19. Ng1 Kf7 20. Nh3 Rac8 21. Rhg1 b6
22. h5 Qc3+ 23. Ke2 Nc6 24. hxg6+ Kg7 25. Rad1 Nxd4+ 26. Kf1
Rhe8 27. Rg3 Nc6 28. Qh4 Nxe5 29. Nf4 Ng4 30. Nxe6+ Rxe6
31. Bxf5 Qc4+ 32. Kg1 1-0
```
The game meta-data at the top are called the "tags" while the actual game below is referred to as the "moves". Choosing to use PGNs for this application was then an easy decision, but now brought up the challenge of how to implement their usage. I decided to store the PGNs themselves as text strings in the database, validated and standardized into a universal format on the API server before storage in order to clean up any sloppy hand-made PGNs and keep the database files clean and organized. Cleaned up and standardized, the PGN files could now be reliably parsed on the frontend to show information about each game on the games table for the owners of collections, and in the header section of the game on the play-through applet. In order to put the moves of the game into an easily-usable and manipulable format for the play-through applet, I would parse the moves and store them into an array where each index represents a ply (a white or black move, both playing is considered a full move). Then, I could implement backwards and forwards buttons that would simply push and pop moves from that moves array onto the stack and render them on the board:
```js
const  moveOne  = () => {
	if(move  <  game.moves.length -  2) {
		const  newMove  =  move  +  1;
		setMove(newMove);
		gameBoard.move(game.moves[newMove].notation.notation);
		setFen(gameBoard.fen());
	}
};

const  moveBack  = () => {
	if(move  >  -1) {
		const  newMove  =  move  -  1;
		setMove(newMove);
		gameBoard.undo();
		setFen(gameBoard.fen());
	}
};
```
Where game.moves is the array holding the moves of the historical game, gameBoard holds the state of the board in our app, and move/newMove is an integer representing where in the historical game we currently are.

## Future Plans

 1. Annotations on individual moves so users can follow games with move-by-move commentary.
 2. Favoriting collections so that users can have an idea of the community reception of collections.
 3. Completing games and completing collections so that users can gain a sense of completion and accomplishment from playing through collections, and have their number of completed collections increase with time.
 4. User profiles so that users can show off how many collections they have completed and any collections they have curated, as well as share something about themselves with the community.
