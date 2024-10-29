import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Button } from 'react-bootstrap';

interface BarcodeGeneratorProps {
  value: string;
  name: string;
}

export function BarcodeGenerator({ value, name }: BarcodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, value, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10
      });
    }
  }, [value]);

  const printBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print barcodes');
      return;
    }

    const style = `
      <style>
        @media print {
          @page { margin: 0; }
          body { margin: 0.5cm; }
          .print-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .item-name {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin-bottom: 5px;
          }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Barcode - ${name}</title>
          ${style}
        </head>
        <body>
          <div class="print-container">
            <div class="item-name">${name}</div>
            <img src="${canvas.toDataURL()}" />
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <canvas ref={canvasRef}></canvas>
      <Button variant="outline-primary" size="sm" onClick={printBarcode}>
        Print Barcode
      </Button>
    </div>
  );
}