import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="container flex gap-6 p-6 m-auto">
      <Link className="button" to="/">
        Back to Home
      </Link>
      {location.pathname === '/generate' ? (
        <Link className="button" to="/scan">
          Scan
        </Link>
      ) : (
        <Link className="button" to="/generate">
          Generate
        </Link>
      )}
    </nav>
  );
};
