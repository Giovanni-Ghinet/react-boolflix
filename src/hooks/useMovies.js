import { useState, useEffect } from 'react';
import api from '../utils/api';

const { searchMovies, searchTvShows, API_KEY } = api;

const useSearchMovies = () => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('all'); // 'all' | 'movie' | 'tv'
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const triggerSearch = (searchText, type = 'all') => {
        if (!searchText.trim()) return;
        
        setError(null);
        setSearchType(type);
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
        
        const promises = [];
        
        if (searchType === 'all' || searchType === 'movie') promises.push(searchMovies(query));
        if (searchType === 'all' || searchType === 'tv') promises.push(searchTvShows(query));

        Promise.all(promises)
            .then((responses) => {
                // Appiattisce l'array di array (film + serie) in un unico array
                setResults(responses.flat());
            })
            .catch(err => {
                setError(err.message);
                setResults([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query, searchType]);

    return { results, loading, error, triggerSearch, query, searchType };
};

export default useSearchMovies;