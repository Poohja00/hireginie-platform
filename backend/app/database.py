"""
database.py

This file handles the connection between our FastAPI backend
and the PostgreSQL database.

Think of it as the bridge between:
Backend (Python code)
and
Database (PostgreSQL)
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Database connection string
# Format:
# postgresql://username:password@host:port/database

DATABASE_URL = "postgresql://postgres:admin@localhost:5432/hiregine_db"

# Engine = connection to PostgreSQL
engine = create_engine(DATABASE_URL)

# SessionLocal will create database sessions when needed
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class used by models
Base = declarative_base()


# Dependency used by FastAPI routes
# This function will give routes access to the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()