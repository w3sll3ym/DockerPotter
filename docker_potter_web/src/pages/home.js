import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca livro aleatório na API externa
    axios.get('https://potterapi-fedeperin.vercel.app/en/books/random')
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!book) return <div>Carregando...</div>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Livro #{book.number} {book.originalTitle}</h2>
      <img 
        src={book.cover} 
        alt={book.originalTitle} 
        style={{ cursor: 'pointer', maxWidth: '300px' }}
        onClick={() => navigate('/details', { state: { book } })} 
      />
      <p>Clique na capa para ver detalhes</p>
    </div>
  );
}
export default Home;