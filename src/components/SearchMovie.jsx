import { useState } from 'react';
import { useSearch } from '../contexts/MoviesContext';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { triggerSearch, results, loading, error, query } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSearch(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Cerca un film..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cerco...' : 'Cerca'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Errore: {error}</p>}

      {query && !loading && (
        <div>
          <h3>Risultati per "{query}"</h3>
          {results.length === 0 ? (
            <p>Nessun film trovato.</p>
          ) : (
            <ul>
              {results.map(movie => (
                <li key={movie.id}>
                  <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4) || 'N/D'})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;