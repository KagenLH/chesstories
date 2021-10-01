from flask.cli import AppGroup
from .users import seed_users, undo_users
from .collections import seed_collections, undo_collections
from .games import seed_games, undo_games
from .annotations import seed_annotations, undo_annotations
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_collections()
    seed_games()
    seed_annotations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_collections()
    undo_games()
    undo_annotations()
    # Add other undo functions here
