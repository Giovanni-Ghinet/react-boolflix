import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import SearchMovie from "./SearchMovie";

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-lg bg-black border-bottom border-dark sticky-top">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold text-danger fs-3" to="/">
                        BOOLFLIX
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                            <li className="nav-item opacity-50"><NavLink className="nav-link" to="#">Serie TV</NavLink></li>
                            <li className="nav-item opacity-50"><NavLink className="nav-link" to="#">Film</NavLink></li>
                            <li className="nav-item opacity-50"><NavLink className="nav-link" to="#">Originali</NavLink></li>
                        </ul>

                        
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item ms-lg-3">
                                <SearchMovie />
                            </li>
                            <li className="nav-item ms-2">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={toggleTheme}
                                    aria-label="Cambia tema"
                                >
                                    {theme === 'light' ? '🌙' : '☀️'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
