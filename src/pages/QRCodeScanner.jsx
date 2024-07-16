import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import QrScanner from 'qr-scanner';
import { Navigation } from '../components/Navigation';

export const QRCodeScanner = () => {
  const [scanned, setScanned] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const scanLink = scanned.match(/^https?:\/\//);

  function onScanHandler(result) {
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

  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      QrScanner.scanImage(file)
        .then((result) => {
          setScanned(result);
          setError('');
        })
        .catch(() => {
          setScanned('');
          setError('QR code not found');
        });
    }
  }

  return (
    <div>
      <Navigation />
      <div>
        <Scanner
          components={{ audio: false, finder: false }}
          styles={{ container: { width: 256 } }}
          onScan={onScanHandler}
        />
        <input type="file" accept="image/*" onChange={uploadFile} />
        {imagePreview && <img src={imagePreview} alt="Preview" />}
        {error && <p>{error}</p>}
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
