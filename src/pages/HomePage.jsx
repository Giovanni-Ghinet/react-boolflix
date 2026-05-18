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
      <h1>Benvenuto su Boolflix</h1>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">Errore: {error}</p>}

      {query && !loading && (
        <section className="mt-4">
          <h2>Risultati della ricerca per: "{query}"</h2>
          {results.length === 0 ? (
            <p>Nessun risultato trovato per questa ricerca.</p>
          ) : (
            <ul className="list-group">
              {results.map(item => (
                <li key={`${item.type}-${item.id}`} className="list-group-item d-flex gap-3">
                  <img 
                    src={item.poster_path ? `${IMG_BASE_URL}${item.poster_path}` : 'https://placehold.co/342x513?text=No+Poster'} 
                    alt={item.title} 
                    className="poster-img shadow-sm"
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">
                          {item.title}
                          <span className="badge bg-secondary ms-2 lang-badge-text text-uppercase">
                            {item.type === 'movie' ? 'Film' : 'Serie TV'}
                          </span>
                        </h5>
                        <p className="mb-1 text-muted small">Titolo Originale: {item.original_title}</p>
                        <p className="mb-1 text-muted small">Lingua: {getFlag(item.original_language)}</p>
                        <div className="mt-2">
                          {renderStars(item.vote_average)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
export default HomePage;
