import React from 'react';
import { Table } from 'react-bootstrap';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import JsBarcode from 'jsbarcode';

export function EquipmentList() {
  const equipment = useLiveQuery(() => db.equipment.toArray());

  const generateBarcode = (barcode: string) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcode, {
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true
    });
    return canvas.toDataURL('image/png');
  };

  return (
    <div className="p-4">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Serial Number</th>
            <th>Condition</th>
            <th>Location</th>
            <th>Quantity</th>
            <th>Barcode</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {equipment?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.serialNumber}</td>
              <td>{item.conditionStatus}</td>
              <td>{item.location}</td>
              <td>{item.quantity}</td>
              <td>
                <img 
                  src={generateBarcode(item.barcode)} 
                  alt={`Barcode for ${item.name}`}
                  style={{ maxWidth: '150px' }}
                />
              </td>
              <td>{item.dateAdded.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}