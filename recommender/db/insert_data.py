import json

from db_config import SessionLocal
from models import Book


def insert_data(file_path):
    session = SessionLocal()
    with open(file_path, "r") as f:
        for line in f:
            data = json.loads(line)
            book = Book(
                id=data["book_id"],
                title=data["title"],
                authors=data["authors"],
                category=data["category"],
                description=data["description"],
                embedding=data["embedding"],
            )
            session.add(book)
    session.commit()
    session.close()
    print("✅ Data inserted successfully.")


if __name__ == "__main__":
    insert_data("../data/book_embeddings.ndjson")
