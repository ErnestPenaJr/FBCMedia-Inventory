import Dexie, { Table } from 'dexie';

export interface Equipment {
  id?: number;
  name: string;
  category: string;
  serialNumber: string;
  conditionStatus: string;
  location: string;
  quantity: number;
  imagePath?: string;
  barcode: string;
  dateAdded: Date;
}

export class InventoryDatabase extends Dexie {
  equipment!: Table<Equipment>;

  constructor() {
    super('InventoryDatabase');
    this.version(1).stores({
      equipment: '++id, name, category, serialNumber, barcode'
    });
  }
}

export const db = new InventoryDatabase();