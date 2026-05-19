import { useState, useEffect } from 'react';
import api from '../utils/api';

const { searchMovies, searchTvShows, API_KEY } = api;

const useSearchMovies = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const triggerSearch = (searchText) => {
        if (!searchText.trim()) return;
        
        setError(null);
        setQuery(searchText);
    };

    // usata la use effect per fare la fetch solo quando cerco un film al submit

    useEffect(() => {
        if (!query) return;

        if (!API_KEY || API_KEY === "") {
            console.error("ERRORE: API Key mancante. Controlla il file .env e riavvia il server.");
            setError("API Key non configurata");
            return;
        }

        setLoading(true);
        setError(null);
        
        Promise.all([
            searchMovies(query),
            searchTvShows(query)
        ])
            .then(([movies, tvShows]) => {
                setResults([...movies, ...tvShows]);
            })
            .catch(err => {
                setError(err.message);
                setResults([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return { results, loading, error, triggerSearch, query };
};

export default useSearchMovies;