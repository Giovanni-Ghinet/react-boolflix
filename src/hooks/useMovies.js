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

        const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=it-IT`;
        const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=it-IT`;

        // Promise.all per unire le 2 chiamate

        Promise.all([
            fetch(movieUrl, options).then(res => {
                if (!res.ok) throw new Error(`Errore Film: ${res.status}`);
                return res.json();
            }),
            fetch(tvUrl, options).then(res => {
                if (!res.ok) throw new Error(`Errore Serie TV: ${res.status}`);
                return res.json();
            })
        ])
            .then(([movieData, tvData]) => {
                const movies = (movieData.results || []).map(m => ({ ...m, type: 'movie' }));

                // tv e movies hanno il titolo e titolo originale diversi con la map 
                // li ho strasformati come movies per poterli chiamare allo stesso modo
                
                const tvShows = (tvData.results || []).map(tv => ({
                    ...tv,
                    title: tv.name, 
                    original_title: tv.original_name, 
                    type: 'tv'
                }));
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