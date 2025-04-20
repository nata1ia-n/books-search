from typing import List

from pydantic import BaseModel


class BookBase(BaseModel):
    title: str
    authors: str
    category: str
    description: str


class BookCreate(BookBase):
    embedding: List[float]


class BookRead(BookBase):
    id: int

    class Config:
        from_attributes = True


class BookResponse(BaseModel):
    id: int
    title: str
    authors: str
    category: str
    description: str

    class Config:
        from_attributes = True
