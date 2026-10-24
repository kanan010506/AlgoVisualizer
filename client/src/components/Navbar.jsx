import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Algo<span>Visualizer</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/explore">Explore Algorithms</NavLink>
        </nav>
        <Link to="/explore" className="btn btn-primary">Explore Algorithms</Link>
      </div>
    </header>
  );
}