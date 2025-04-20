from pgvector.sqlalchemy import Vector
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=False)
    authors = Column(Text, nullable=False)
    category = Column(Text)
    description = Column(Text)
    embedding = Column(Vector(768))
