import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <main className="flex min-h-[100vh] flex-col items-center justify-center gap-6">
      <h1 className="text-center text-4xl font-bold sm:text-7xl">
        Create and scan <br />
        <span className="text-orange-500"> QR codes </span>
        for free.
      </h1>
      <div className="flex gap-4 sm:text-2xl">
        <Link className="button" to="/generate">
          Generate
        </Link>
        <Link className="button" to="/scan">
          Scan
        </Link>
      </div>
    </main>
  );
};
