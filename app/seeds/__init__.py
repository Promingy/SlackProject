from flask.cli import AppGroup
from .users import seed_users_servers, undo_users
from .messages import seed_messages, undo_messages
from .channels import seed_channels, undo_channels
from .reactions import seed_reactions, undo_reactions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reactions()
        undo_messages()
        undo_channels()
        undo_users()
    seed_users_servers()
    # Add other seed functions here
    seed_messages()
    seed_channels()
    seed_reactions()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_reactions()
    undo_messages()
    undo_channels()
    undo_users()
