const API_KEY = import.meta.env.VITE_API_MOVIE;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'it-IT';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

function searchMovies(query) {
    const params = new URLSearchParams({ query, language: LANGUAGE });
    const url = `${BASE_URL}/search/movie?${params}`;

    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                return data.results;
            } else {
                throw new Error("Dati non presenti");
            }
        })
        .then(movies => {
            return movies.map(movie => {
                return {
                    ...movie,
                    type: 'movie'
                };
            })
        });
}

function searchTvShows(query) {
    const params = new URLSearchParams({ query, language: LANGUAGE });
    const url = `${BASE_URL}/search/tv?${params}`;

    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                return data.results;
            } else {
                throw new Error("Dati non presenti");
            }
        })
        .then(tvShows => {
            return tvShows.map(tv => {
                return {
                    ...tv,
                    original_title: tv.original_name,
                    title: tv.name,
                    type: 'tv'
                };
            })
        });
}

function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?language=${LANGUAGE}`;

    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            return (data.results || []).slice(0, 4).map(movie => ({
                ...movie,
                type: 'movie'
            }));
        });
}

function getPopularTvShows() {
    const url = `${BASE_URL}/tv/popular?language=${LANGUAGE}`;

    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            return (data.results || []).slice(0, 4).map(tv => ({
                ...tv,
                original_title: tv.original_name,
                title: tv.name,
                type: 'tv'
            }));
        });
}

function getItemDetails(type, id) {
    const url = `${BASE_URL}/${type}/${id}?language=${LANGUAGE}`;
    return fetch(url, options)
        .then(res => {
            if (!res.ok) throw new Error("Dettagli non trovati");
            return res.json();
        })
        .then(item => ({
            ...item,
            type: type,
            title: item.title || item.name,
            original_title: item.original_title || item.original_name
        }));
}

export default {
    API_KEY,
    searchMovies,
    searchTvShows,
    getPopularMovies,
    getPopularTvShows,
    getItemDetails
};