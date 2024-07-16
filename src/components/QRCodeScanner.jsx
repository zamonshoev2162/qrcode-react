import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

export const QRCodeScanner = () => {
  const [scanned, setScanned] = useState('');
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

  return (
    <div>
      <div>
        <Scanner
          components={{ audio: false, finder: false }}
          styles={{ container: { width: 256 } }}
          onScan={onScanHandler}
        />
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
