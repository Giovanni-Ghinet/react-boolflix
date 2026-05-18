import { useState, useEffect } from 'react';

// serve per prendere la chiave dal file .env e settare gli headers

const API_KEY = import.meta.env.VITE_API_MOVIE;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// funzione della fetch, per i controlli e creazione delle useState

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

        //encoder per eliminare gli spazi o simboli che creano conflitto nel url

        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=it-IT`;

        // chiamata fetch

        fetch(url, options)
            .then(response => {

                return response.json();
            })
            .then(data => {
                setResults(data.results || []);
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