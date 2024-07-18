import { useState } from 'react';
import QrScanner from 'qr-scanner';
import { Navigation } from '../components/Navigation';

export const QRCodeScanner = () => {
  const [scanned, setScanned] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState();
  const [copySuccess, setCopySuccess] = useState();
  const scanLink = scanned.match(/^https?:\/\//);

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
        <label className="button h-fit w-fit">
          <input
            className="h-0 w-0 opacity-0"
            type="file"
            accept="image/*"
            onChange={uploadFile}
          />
          <span>Upload image</span>
        </label>
        <div className="flex w-full flex-col-reverse gap-4 pt-5 md:flex-row">
          {imagePreview && (
            <div className="h-64 md:w-6/12">
              <img className="object-cover" src={imagePreview} alt="Preview" />
            </div>
          )}
          <div className="flex flex-col gap-4 md:w-6/12">
            {error && <p className="text-center text-4xl font-bold">{error}</p>}
            {scanned && (
              <div className="flex justify-center gap-4 text-nowrap">
                <button
                  className="button h-fit w-fit"
                  onClick={copyToClipboard}
                >
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
              <p className="min-w-64 overflow-x-auto text-wrap rounded-lg border-2 border-orange-100 p-5 text-justify">
                {scanned}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
