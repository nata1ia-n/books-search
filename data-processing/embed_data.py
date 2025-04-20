# -*- coding: utf-8 -*-
"""
Embedding Books using ollama API.

This script loads the book data, embeds each book description, saves the embeddings,
and saves them in a file.
"""

import json
import os
import time

import ollama
import pandas as pd

df = pd.read_csv("../data/cleaned_books.csv")

EMBEDDINGS_FILE = "../data/book_embeddings.ndjson"
BATCH_SIZE = 100


def get_embedding(text):
    """Single embedding for testing or debugging."""
    response = ollama.embeddings("nomic-embed-text", text)
    return response["embedding"][0]


def load_existing_indices():
    """Load processed book IDs from NDJSON file."""
    if not os.path.exists(EMBEDDINGS_FILE):
        return set()

    processed_indices = set()
    with open(EMBEDDINGS_FILE, "r") as f:
        for line in f:
            try:
                data = json.loads(line.strip())
                processed_indices.add(data["book_id"])
            except (json.JSONDecodeError, KeyError):
                continue

    return processed_indices


def save_embedding(entry):
    """Append a single entry to the NDJSON file."""
    with open(EMBEDDINGS_FILE, "a") as f:
        json.dump(entry, f)
        f.write("\n")


def get_batch_embeddings(texts, categories, titles, authors, indices, batch_size=100):
    processed_indices = load_existing_indices()
    total_books = len(texts)

    for i in range(0, total_books, batch_size):
        start, end = i, min(i + batch_size, total_books)
        print(f"Processing batch {start}-{end - 1} of {total_books}...")

        batch_data = [
            (texts[j], categories[j], titles[j], authors[j], indices[j])
            for j in range(start, end)
            if indices[j] not in processed_indices
        ]

        if not batch_data:
            continue  

        batch_texts, batch_categories, batch_titles, batch_authors, batch_indices = zip(
            *batch_data
        )

        for j, (desc, cat) in enumerate(zip(batch_texts, batch_categories)):
            combined_text = desc + " " + cat
            try:
                embedding = ollama.embeddings("nomic-embed-text", combined_text)[
                    "embedding"
                ]
            except Exception as e:
                print(f"Error embedding entry {batch_indices[j]}: {e}")
                continue

            entry = {
                "book_id": batch_indices[j],
                "title": batch_titles[j],
                "authors": batch_authors[j],
                "description": desc,
                "category": cat,
                "embedding": embedding,
            }
            save_embedding(entry)
            processed_indices.add(batch_indices[j])

        remaining = total_books - end
        print(
            f"Batch {start}-{end - 1} complete. Remaining: {remaining if remaining > 0 else 0}"
        )

    print("All batches processed successfully.")


print("Starting embedding process...")
start_time = time.time()

sample_texts = df["description"].tolist()
sample_categories = df["category"].tolist()
sample_titles = df["title"].tolist()
sample_authors = df["authors"].tolist()

get_batch_embeddings(
    sample_texts,
    sample_categories,
    sample_titles,
    sample_authors,
    list(df.index),
    batch_size=BATCH_SIZE,
)

print(f"Time taken for all books in batches: {time.time() - start_time:.2f} seconds")
print("Embedding process complete.")
