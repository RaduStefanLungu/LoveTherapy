import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ dataToEncode, backgroundColor, codeColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const canvas = canvasRef.current;
        await QRCode.toCanvas(canvas, dataToEncode, { color: { dark: codeColor, light: backgroundColor } });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [dataToEncode, backgroundColor, codeColor]);

  return <canvas ref={canvasRef} />;
};

export default QRCodeGenerator;
