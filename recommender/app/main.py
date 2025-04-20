import ollama
from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from db import db_config
from db.models import Book

from . import crud, schemas

app = FastAPI()


def get_db():
    db = db_config.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/add-book", response_model=schemas.BookRead)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db=db, book=book)


@app.get("/search", response_model=list[schemas.BookResponse])
def search_books(title: str = "", author: str = "", db: Session = Depends(get_db)):
    query = db.query(Book)

    if title:
        query = query.filter(Book.title.ilike(f"%{title}%"))
    if author:
        query = query.filter(
            or_(Book.authors.ilike(f"%{author}%"), Book.authors.ilike(f"%By {author}%"))
        )

    return query.limit(20).all()


class SimilarQuery(BaseModel):
    query: str
    top_k: int = 5


@app.post("/similar")
def get_similar_books(
    body: SimilarQuery,
    db: Session = Depends(get_db),
):
    response = ollama.embeddings("nomic-embed-text", body.query)
    query_embedding = response["embedding"]

    similarity = (
        select(Book)
        .order_by(Book.embedding.op("<->")(query_embedding))
        .limit(body.top_k)
    )

    results = db.execute(similarity).scalars().all()

    return [
        {
            "id": book.id,
            "title": book.title,
            "authors": book.authors,
            "category": book.category,
            "description": book.description,
        }
        for book in results
    ]
