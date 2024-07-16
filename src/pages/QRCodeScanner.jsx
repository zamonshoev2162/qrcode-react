import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import QrScanner from 'qr-scanner';
import { Navigation } from '../components/Navigation';

export const QRCodeScanner = () => {
  const [scanned, setScanned] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState();
  const [copySuccess, setCopySuccess] = useState();
  const scanLink = scanned.match(/^https?:\/\//);

  function onScanHandler(result) {
    setScanned('');
    setError('');
    setImagePreview('');
    setScanned(result[0]?.rawValue || '');
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(scanned).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3500);
    });
  }

  function openLink() {
    if (scanLink) window.open(scanned, '_blank');
  }

  function uploadFile(e) {
    const file = e.target.files[0];
    setScanned('');
    setError('');
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      QrScanner.scanImage(file)
        .then((result) => setScanned(result))
        .catch(() => setError('QR code not found'));
    }
  }

  return (
    <div>
      <Navigation />
      <div>
        <div>
          <Scanner
            components={{ audio: false }}
            styles={{ container: { width: 256 } }}
            onScan={onScanHandler}
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={uploadFile} />
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          {error && <p>{error}</p>}
        </div>
      </div>
      <p>{scanned}</p>
      {scanned && (
        <div>
          <button onClick={copyToClipboard}>
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
          {scanLink && <button onClick={openLink}>Open Link</button>}
        </div>
      )}
    </div>
  );
};
