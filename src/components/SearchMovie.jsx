import { useState } from 'react';
import { useSearch } from '../contexts/MoviesContext';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { triggerSearch, loading } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      triggerSearch(inputValue);
      setInputValue('');
    }
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
    </div>
  );
};

export default SearchBar;