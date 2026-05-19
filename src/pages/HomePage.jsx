import { useSearch } from "../contexts/MoviesContext";

function HomePage() {
  const { results, loading, error, query } = useSearch();

  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w342';

  // Trasforma il voto da 1-10 in 1-5 arrotondato per eccesso
  // Gestisce anche le mezze stelle per decimali tra 0.3 e 0.7
  const renderStars = (vote) => {
    const scaledVote = vote / 2; // trasforma il voto da 0-10 a 0-5
    const fullStars = Math.floor(scaledVote);
    const decimalPart = scaledVote - fullStars;
    const stars = [];

    let hasHalfStar = false;
    let finalFullStars = fullStars;

    if (decimalPart >= 0.3 && decimalPart <= 0.7) {
      hasHalfStar = true;
    } else if (decimalPart > 0.7) {
      finalFullStars = fullStars + 1;
    }

    for (let i = 1; i <= 5; i++) {
      if (i <= finalFullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (hasHalfStar && i === finalFullStars + 1) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
        hasHalfStar = false; // Assicura che ci sia solo una mezza stella
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };

  // lingue più utilizzate

  const getFlag = (lang) => {
    if (!lang) return null;

    const langMap = {
      en: 'GB',
      it: 'IT',
      fr: 'FR',
      es: 'ES',
      de: 'DE',
      ja: 'JP',
      ko: 'KR'
    };

    const countryCode = langMap[lang.toLowerCase()];

    return countryCode ? (
      <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
           alt={lang} className="ms-2 shadow-sm flag-icon" />
    ) : (
      <span className="ms-2 text-uppercase badge bg-secondary lang-badge-text">{lang}</span>
    );
  };

  return (
    <div className="container py-4">
      <h1>Originale Boolflix</h1>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">Errore: {error}</p>}

      {query && !loading && (
        <section className="mt-4">
          <h5>Risultati della ricerca per: "{query}" e consigliati per te:</h5>
          <hr className="border-secondary" />
          {results.length === 0 ? (
            <p className="text-muted">Nessun risultato trovato per questa ricerca.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {results.map(item => (
                <div key={`${item.type}-${item.id}`} className="col">
                  <div className="movie-card shadow rounded overflow-hidden">
                    <img 
                      src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'https://placehold.co/342x513?text=No+Poster'} 
                      alt={item.title} 
                      className="poster-bg"
                    />
                    <div className="movie-card-overlay">
                      <h6 className="fw-bold mb-1">{item.title}</h6>
                      <p className=" text-light opacity-75 mb-1 text-small">
                        {item.original_title}
                      </p>
                      
                      <div className="d-flex align-items-center mb-2">
                        {getFlag(item.original_language)}
                        <span className="badge bg-danger ms-auto badge-type">
                          {item.type === 'movie' ? 'FILM' : 'SERIE'}
                        </span>
                      </div>

                      <div className="mb-2 stars-container">
                        {renderStars(item.vote_average)}
                      </div>

                      <p className="small text-secondary overview-text mt-2 movie-overview">
                        {item.overview || 'Trama non disponibile.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
export default HomePage;
