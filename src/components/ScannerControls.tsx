import React from 'react';
import { Button } from 'react-bootstrap';

interface ScannerControlsProps {
  scanning: boolean;
  onStartScan: () => void;
  onStopScan: () => void;
}

export function ScannerControls({ scanning, onStartScan, onStopScan }: ScannerControlsProps) {
  return (
    <div className="mt-3">
      {!scanning ? (
        <Button onClick={onStartScan}>Start Scanner</Button>
      ) : (
        <Button onClick={onStopScan} variant="secondary">Stop Scanner</Button>
      )}
    </div>
  );
}