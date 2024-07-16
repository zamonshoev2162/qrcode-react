import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Navigation } from '../components/Navigation';

export const QRCodeGenerator = () => {
  const [value, setValue] = useState('');
  const [colors, setColors] = useState({
    bg: '#ffffff',
    fg: '#000000',
  });

  function onChangeHandler(e) {
    const { id, value } = e.target;
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColors((prevColors) => ({ ...prevColors, [id]: value }));
    } else {
      e.target.value = colors[id];
    }
  }

  return (
    <div>
      <Navigation />
      <div>
        <QRCodeSVG value={value} bgColor={colors.bg} fgColor={colors.fg} />
      </div>
      <input
        type="text"
        placeholder="Enter text or link..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        <label htmlFor="bg">Background Color</label>
        <input
          type="color"
          id="bg"
          value={colors.bg}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="fg">Foreground Color</label>
        <input
          type="color"
          id="fg"
          value={colors.fg}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};
