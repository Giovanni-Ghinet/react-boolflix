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
                  <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4) || 'N/D'})
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
