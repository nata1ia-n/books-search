# 📚 Books Search

Books Search is a web application that allows users to find books using natural language. It is powered by text embeddings that capture metadata such as title, authors, genre, and description.

## 🌐 Overview

The project consists of a Python FastAPI backend and a Next.js frontend. Book embeddings are generated using the open-source model nomic-embed-text (run via Ollama), and stored in a PostgreSQL database using the pgvector extension.

## 🚀 Running the project

### 📊 Data Processing

#### Prerequisites

- A dataset of books containing title, authors, genre (category), and description.
- The exact dataset used in this project: [Books Dataset on Kaggle](https://www.kaggle.com/datasets/elvinrustam/books-dataset)
- Ollama installed and running locally
- The nomic-embed-text model downloaded via Ollama

#### Steps

1. Navigate to the **data-processing** project folder.
2. Clean the dataset using the clean_data.ipynb Jupyter notebook.
3. Generate embeddings by running the embed_data.py script.

### 🧠 Recommender Backend (FastAPI)

1. Navigate to the **recommender** project folder.
2. Install dependencies: `make install`
3. Update the .env file with your local PostgreSQL DATABASE_URL.
4. Start the FastAPI server: `make run`

### 🖥️ Recommender Frontend (Next.js)

1. Navigate to the **recommender-fe** project folder.
2. Update the .env file with the URL of your running FastAPI backend.
3. Install dependencies: `make install`
4. Start the frontend app: `make run`
