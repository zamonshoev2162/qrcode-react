import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <div>
      <button>
        <Link to="/">Вернуться на главную</Link>
      </button>
      {location.pathname === '/generate' ? (
        <button>
          <Link to="/scan">Сканировать</Link>
        </button>
      ) : (
        <button>
          <Link to="/generate">Сгенерировать</Link>
        </button>
      )}
    </div>
  );
};
