import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <div>
      <button>
        <Link to="/">Back to Home</Link>
      </button>
      {location.pathname === '/generate' ? (
        <button>
          <Link to="/scan">Scan</Link>
        </button>
      ) : (
        <button>
          <Link to="/generate">Generate</Link>
        </button>
      )}
    </div>
  );
};
