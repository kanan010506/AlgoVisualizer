import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container page">
      <h2>Page not found</h2>
      <p className="muted">That page doesn't exist.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go Home</Link>
    </main>
  );
}