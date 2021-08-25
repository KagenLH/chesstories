"""empty message

Revision ID: e0e1f9debf7f
Revises: ffdc0a98111c
Create Date: 2021-08-25 17:39:40.109762

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e0e1f9debf7f'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('collections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=70), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('preview_url', sa.Text(), nullable=True),
    sa.Column('banner_url', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('collections')
    # ### end Alembic commands ###