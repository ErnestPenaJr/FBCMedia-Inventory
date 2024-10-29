import React from 'react';
import { Alert } from 'react-bootstrap';

interface ScannerStatusProps {
  error: string | null;
  onDismissError: () => void;
}

export function ScannerStatus({ error, onDismissError }: ScannerStatusProps) {
  if (!error) return null;

  return (
    <Alert variant="danger" onClose={onDismissError} dismissible>
      {error}
    </Alert>
  );
}