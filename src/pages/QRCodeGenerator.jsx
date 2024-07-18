import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng, toJpeg } from 'html-to-image';
import download from 'downloadjs';
import { Navigation } from '../components/Navigation';

export const QRCodeGenerator = () => {
  const [value, setValue] = useState('');
  const [colors, setColors] = useState({
    bg: '#ffffff',
    qr: '#000000',
  });
  const qrRef = useRef(null);

  function onChangeHandler(e) {
    const { id, value } = e.target;
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColors((prevColors) => ({ ...prevColors, [id]: value }));
    } else {
      e.target.value = colors[id];
    }
  }

  function downloadQRCode(format) {
    if (!qrRef.current) return;

    const downloadBlob = (dataUrl, fileName) => {
      download(dataUrl, fileName);
    };

    switch (format) {
      case 'svg':
        const svgData = new XMLSerializer().serializeToString(qrRef.current);
        const svgBlob = new Blob([svgData], {
          type: 'image/svg+xml;charset=utf-8',
        });
        download(svgBlob, 'qrcode.svg');
        break;
      case 'png':
        toPng(qrRef.current).then((dataUrl) =>
          downloadBlob(dataUrl, 'qrcode.png'),
        );
        break;
      case 'jpg':
        toJpeg(qrRef.current, { quality: 0.95 }).then((dataUrl) =>
          downloadBlob(dataUrl, 'qrcode.jpg'),
        );
        break;
    }
  }

  return (
    <div>
      <Navigation />
      <main className="container m-auto flex flex-col items-center gap-4 p-5 md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-4 md:w-fit">
          <textarea
            className="max-h-96 min-h-48 w-full rounded-lg border-2 border-inherit bg-transparent p-2 outline-none focus:border-orange-500 lg:w-[486px]"
            placeholder="Enter text or link... (Max. length 715 characters)"
            maxLength="700"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className="flex w-full gap-4 text-[12px] md:justify-center lg:text-base">
            <label
              className="button flex w-6/12 items-center md:w-fit"
              style={{ backgroundColor: colors.bg }}
            >
              <span className="flex-shrink-0 mix-blend-difference">
                Background Color
              </span>
              <input
                className="w-full flex-grow opacity-0"
                type="color"
                id="bg"
                value={colors.bg}
                onChange={onChangeHandler}
              />
            </label>
            <label
              className="button flex w-6/12 items-center md:w-fit"
              style={{ backgroundColor: colors.qr }}
            >
              <span className="flex-shrink-0 mix-blend-difference">
                QR Code Color
              </span>
              <input
                className="w-full flex-grow opacity-0"
                type="color"
                id="qr"
                value={colors.qr}
                onChange={onChangeHandler}
              />
            </label>
          </div>
        </div>
        <div className="flex scale-75 flex-col items-center gap-4 md:scale-100">
          <div ref={qrRef}>
            <QRCodeSVG
              className="rounded-lg"
              value={value}
              bgColor={colors.bg}
              fgColor={colors.qr}
              size={384}
              includeMargin={true}
            />
          </div>
          <div className="flex gap-2">
            <button className="button" onClick={() => downloadQRCode('svg')}>
              Download SVG
            </button>
            <button className="button" onClick={() => downloadQRCode('png')}>
              Download PNG
            </button>
            <button className="button" onClick={() => downloadQRCode('jpg')}>
              Download JPG
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
