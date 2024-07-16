import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <main>
        <h1>
          Create and scan <span>QR codes</span> for free
        </h1>
        <div>
          <button>
            <Link to="/generate">Generate</Link>
          </button>
          <button>
            <Link to="/scan">Scan</Link>
          </button>
        </div>
      </main>
    </div>
  );
};
