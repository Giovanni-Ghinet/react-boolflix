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

export default {
    API_KEY,
    searchMovies,
    searchTvShows
};