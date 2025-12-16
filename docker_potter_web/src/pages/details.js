import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Details() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;

  if (!book) return <p>Livro não encontrado. Volte para a Home.</p>;

  const handleSave = () => {
    // Envia para o backend (docker_potter_api)
    axios.post('http://localhost:8000/favorites', {
      number: book.number,
      originalTitle: book.originalTitle,
      releaseDate: book.releaseDate,
      pages: book.pages,
      description: book.description,
      cover: book.cover
    })
    .then(() => alert('Livro adicionado aos favoritos!'))
    .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Livro #{book.number} {book.originalTitle}</h1>
      <img src={book.cover} alt="Capa" style={{ maxWidth: '200px' }} />
      <p><strong>Data de publicação:</strong> {book.releaseDate}</p>
      <p><strong>Páginas:</strong> {book.pages}</p>
      <p><strong>Descrição:</strong> {book.description}</p>
      
      <button onClick={() => navigate('/')}>Voltar à Página Inicial</button>
      <button onClick={handleSave} style={{ marginLeft: '10px' }}>Adicionar aos Favoritos</button>
    </div>
  );
}
export default Details;