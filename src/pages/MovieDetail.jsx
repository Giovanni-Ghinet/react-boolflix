import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useTheme from "../hooks/useTheme";
import api from "../utils/api";

function MovieDetail() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        setLoading(true);
        api.getItemDetails(type, id)
            .then(data => {
                setItem(data);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [type, id]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-danger" role="status"></div>
                <p className={`mt-2 ${isDark ? 'text-white' : 'text-dark'}`}>Ricerca del titolo in corso...</p>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="container py-5 text-center">
                <h2 className={isDark ? 'text-white' : 'text-dark'}>Contenuto non trovato</h2>
                <button className="btn btn-danger mt-3" onClick={() => navigate('/')}>Torna alla Home</button>
            </div>
        );
    }

    const renderStars = (vote) => {
        const scaledVote = vote / 2;
        const fullStars = Math.floor(scaledVote);
        const decimalPart = scaledVote - fullStars;
        const stars = [];
        let hasHalfStar = decimalPart >= 0.3 && decimalPart <= 0.7;
        let finalFullStars = decimalPart > 0.7 ? fullStars + 1 : fullStars;

        for (let i = 1; i <= 5; i++) {
            if (i <= finalFullStars) {
                stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
            } else if (hasHalfStar && i === finalFullStars + 1) {
                stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
                hasHalfStar = false;
            } else {
                stars.push(<i key={i} className="bi bi-star text-warning"></i>);
            }
        }
        return stars;
    };

    const getFlag = (lang) => {
        if (!lang) return null;
        const langMap = { en: 'GB', it: 'IT', fr: 'FR', es: 'ES', de: 'DE', ja: 'JP', ko: 'KR' };
        const countryCode = langMap[lang.toLowerCase()];
        return countryCode ? (
            <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                 alt={lang} style={{ width: '30px' }} className="shadow-sm flag-icon" />
        ) : (
            <span className="badge bg-secondary text-uppercase">{lang}</span>
        );
    };

    return (
        <div className="container py-5">
            <button className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-secondary'} mb-4`} onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-2"></i> Torna indietro
            </button>

            <div className="row g-5">
                {/* Colonna sinistra: Immagine */}
                <div className="col-12 col-md-5 col-lg-4">
                    <div className="shadow-lg rounded overflow-hidden">
                        <img 
                            src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
                            alt={item.title} 
                            className="img-fluid w-100"
                        />
                    </div>
                </div>

                {/* Colonna destra: Dettagli */}
                <div className={`col-12 col-md-7 col-lg-8 ${isDark ? 'text-white' : 'text-dark'}`}>
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <h1 className="display-4 fw-bold m-0">{item.title}</h1>
                        <span className="badge bg-danger fs-6">
                            {item.type === 'movie' ? 'FILM' : 'SERIE TV'}
                        </span>
                    </div>
                    
                    <h3 className="text-secondary mb-4 italic">
                        {item.original_title !== item.title && item.original_title}
                    </h3>

                    <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom border-secondary">
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-secondary small text-uppercase fw-bold">Lingua:</span>
                            {getFlag(item.original_language)}
                        </div>
                        
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-secondary small text-uppercase fw-bold">Valutazione:</span>
                            <div className="fs-5">
                                {renderStars(item.vote_average)}
                            </div>
                            <span className="ms-1 opacity-75">({item.vote_average.toFixed(1)})</span>
                        </div>
                    </div>

                    <div className="overview-container">
                        <h5 className="text-uppercase text-danger fw-bold mb-3">Trama</h5>
                        <p className="fs-5 lh-lg">
                            {item.overview || "Nessuna descrizione disponibile per questo titolo."}
                        </p>
                    </div>

                    {item.release_date && (
                        <p className="mt-4 text-secondary">
                            Data di uscita: <strong>{new Date(item.release_date).toLocaleDateString('it-IT')}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;