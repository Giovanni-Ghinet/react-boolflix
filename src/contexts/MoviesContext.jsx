import React, { createContext, useContext } from 'react';
import useSearchMovies from '../hooks/useMovies';

// contesto per la ricerca del film

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const searchData = useSearchMovies();
  return <SearchContext value={searchData}>{children}</SearchContext>;
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch deve essere usato dentro SearchProvider');
  return context;
};

export { SearchProvider, useSearch };