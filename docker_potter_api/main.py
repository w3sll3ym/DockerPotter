from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
import os

# Configuração do Banco
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/potterdb")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelo do Banco
class FavoriteDB(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer)
    originalTitle = Column(String)
    releaseDate = Column(String)
    pages = Column(Integer)
    description = Column(Text)
    cover = Column(String)

# Criação das tabelas (caso não existam)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (Permitir que o Frontend React acesse)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Model (Schema de entrada/saída)
class FavoriteBook(BaseModel):
    number: int
    originalTitle: str
    releaseDate: str
    pages: int
    description: str
    cover: str

# Rotas
@app.get("/favorites")
def get_favorites():
    db = SessionLocal()
    favorites = db.query(FavoriteDB).all()
    db.close()
    return favorites

@app.post("/favorites")
def add_favorite(book: FavoriteBook):
    db = SessionLocal()
    db_book = FavoriteDB(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    db.close()
    return {"message": "Livro adicionado aos favoritos!", "book": db_book}

@app.get("/favorites/{book_id}")
def get_favorite(book_id: int):
    db = SessionLocal()
    book = db.query(FavoriteDB).filter(FavoriteDB.id == book_id).first()
    db.close()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book