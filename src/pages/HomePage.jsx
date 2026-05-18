import { useSearch } from "../contexts/MoviesContext";

function HomePage() {
  const { results, loading, error, query } = useSearch();

  return (
    <div className="container py-4">
      <h1>Benvenuto su Boolflix</h1>

      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-danger">Errore: {error}</p>}

      {query && !loading && (
        <section className="mt-4">
          <h2>Risultati della ricerca per: "{query}"</h2>
          {results.length === 0 ? (
            <p>Nessun film trovato per questa ricerca.</p>
          ) : (
            <ul className="list-group">
              {results.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1">{movie.title}</h5>
                      <p className="mb-1 text-muted small">Titolo Originale: {movie.original_title}</p>
                      <p className="mb-0 text-muted small">Lingua: {movie.original_language}</p>
                    </div>
                    <span className="badge bg-primary rounded-pill">Voto: {movie.vote_average.toFixed(1)}</span>
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
