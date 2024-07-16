import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { QRCodeGenerator } from './pages/QRCodeGenerator';
import { QRCodeScanner } from './pages/QRCodeScanner';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<QRCodeGenerator />} />
        <Route path="/scan" element={<QRCodeScanner />} />
      </Routes>
    </>
  );
};
