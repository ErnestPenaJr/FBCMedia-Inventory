import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from 'react-bootstrap';

export function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const initScanner = async () => {
      try {
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode('reader');
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to initialize scanner');
        }
      }
    };

    initScanner();

    return () => {
      const cleanup = async () => {
        try {
          if (scannerRef.current) {
            if (scanning) {
              await scannerRef.current.stop();
            }
            await scannerRef.current.clear();
            scannerRef.current = null;
          }
        } catch (err) {
          console.error('Cleanup error:', err);
        }
      };
      
      cleanup();
    };
  }, [scanning]);

  const stopScanning = useCallback(async () => {
    if (!scannerRef.current || !scanning) return;

    try {
      await scannerRef.current.stop();
      if (mountedRef.current) {
        setScanning(false);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to stop scanner');
        setScanning(false);
      }
    }
  }, [scanning]);

  const startScanning = useCallback(async () => {
    if (!scannerRef.current) {
      setError('Scanner not initialized');
      return;
    }

    try {
      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          if (mountedRef.current) {
            console.log('Scanned barcode:', decodedText);
          }
        },
        (errorMessage) => {
          if (mountedRef.current) {
            console.debug('Scan error:', errorMessage);
          }
        }
      );
      
      if (mountedRef.current) {
        setScanning(true);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to start scanner');
        setScanning(false);
      }
    }
  }, []);

  return (
    <div className="p-4">
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)} 
            aria-label="Close"
          />
        </div>
      )}
      <div id="reader" style={{ width: '100%', maxWidth: '600px' }}></div>
      <div className="mt-3">
        {!scanning ? (
          <Button onClick={startScanning}>Start Scanner</Button>
        ) : (
          <Button onClick={stopScanning} variant="secondary">Stop Scanner</Button>
        )}
      </div>
    </div>
  );
}