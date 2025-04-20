.PHONY: install db stop-db

install:
	uv sync

run:
	uv run uvicorn app.main:app --reload

db:
	brew services start postgresql

stop-db:
	brew services stop postgresql
