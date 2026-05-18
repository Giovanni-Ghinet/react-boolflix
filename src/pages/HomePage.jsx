import { useSearch } from "../contexts/MoviesContext";

function HomePage() {
  const { results, loading, error, query } = useSearch();

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
                <li key={`${item.type}-${item.id}`} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1">
                        {item.title}
                        <span className="badge bg-secondary ms-2 lang-badge-text text-uppercase">
                          {item.type === 'movie' ? 'Film' : 'Serie TV'}
                        </span>
                      </h5>
                      <p className="mb-1 text-muted small">Titolo Originale: {item.original_title}</p>
                      <p className="mb-0 text-muted small">Lingua: {getFlag(item.original_language)}</p>
                    </div>
                    <span className="badge bg-primary rounded-pill d-flex align-items-center">
                      <i className="bi bi-star-fill text-warning me-2"></i>
                      {item.vote_average.toFixed(1)}
                    </span>
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
