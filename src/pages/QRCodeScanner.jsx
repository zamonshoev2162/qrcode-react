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
        .catch(() => setError('QR code not found!'));
    }
  }

  return (
    <div>
      <Navigation />
      <main className="container m-auto flex flex-col gap-4 p-5">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-12">
            <label className="button w-fit">
              <input
                className="h-0 w-0 opacity-0"
                type="file"
                accept="image/*"
                onChange={uploadFile}
              />
              <span>Upload image</span>
            </label>
            {imagePreview && (
              <div className="max-h-80 w-6/12 overflow-hidden rounded-lg border-2 border-orange-100">
                <img
                  className="object-cover"
                  src={imagePreview}
                  alt="Preview"
                />
              </div>
            )}
          </div>
          <div className="h-64 w-64 bg-black">
            <Scanner
              components={{ audio: false, finder: false }}
              styles={{ container: { width: 256 } }}
              onScan={onScanHandler}
            />
          </div>
        </div>

        <div className="m-auto flex w-6/12 flex-col gap-4 pt-5">
          {error && <p className="text-center text-4xl font-bold">{error}</p>}
          {scanned && (
            <div className="flex justify-center gap-4 text-nowrap">
              <button className="button h-fit w-fit" onClick={copyToClipboard}>
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
              {scanLink && (
                <button className="button h-fit w-fit" onClick={openLink}>
                  Open Link
                </button>
              )}
            </div>
          )}
          {scanned !== '' && (
            <p className="min-w-64 overflow-x-auto text-wrap rounded-lg border-2 border-orange-100 p-5 text-justify font-bold">
              {scanned}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
