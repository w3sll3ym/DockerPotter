import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Busca do backend próprio
    axios.get('http://localhost:8000/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>
            <strong>{fav.originalTitle}</strong> (Livro #{fav.number})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Favorites;