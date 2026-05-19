import { useState } from 'react';
import { useSearch } from '../contexts/MoviesContext';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState('all');
  const { triggerSearch, loading } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      triggerSearch(inputValue, searchType);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <div className="input-group input-group-sm" data-bs-theme="dark">
        <select 
          className="form-select bg-dark text-white border-secondary search-filter-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="all">Tutto</option>
          <option value="movie">Film</option>
          <option value="tv">Serie</option>
        </select>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Titoli"
          aria-label="Cerca"
        />
        <button className="btn btn-outline-danger" type="submit" disabled={loading}>
          {loading ? 
            <span className="spinner-border spinner-border-sm" /> : 
            <i className="bi bi-search"></i>}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;