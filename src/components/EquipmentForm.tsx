import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db } from '../db/database';
import { BarcodeGenerator } from './BarcodeGenerator';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  conditionStatus: z.string().min(1, 'Condition status is required'),
  location: z.string().min(1, 'Location is required'),
  quantity: z.number().min(0, 'Quantity must be 0 or greater'),
  barcode: z.string().min(1, 'Barcode is required'),
});

type FormData = z.infer<typeof schema>;

export function EquipmentForm() {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [newEquipment, setNewEquipment] = useState<FormData | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await db.equipment.add({
        ...data,
        dateAdded: new Date(),
      });
      setNewEquipment(data);
      setShowBarcodeModal(true);
      reset();
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register('name')} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control {...register('category')} isInvalid={!!errors.category} />
          <Form.Control.Feedback type="invalid">
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control {...register('serialNumber')} isInvalid={!!errors.serialNumber} />
          <Form.Control.Feedback type="invalid">
            {errors.serialNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition Status</Form.Label>
          <Form.Select {...register('conditionStatus')} isInvalid={!!errors.conditionStatus}>
            <option value="">Select condition...</option>
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.conditionStatus?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control {...register('location')} isInvalid={!!errors.location} />
          <Form.Control.Feedback type="invalid">
            {errors.location?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control 
            type="number" 
            {...register('quantity', { valueAsNumber: true })} 
            isInvalid={!!errors.quantity} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.quantity?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Barcode</Form.Label>
          <Form.Control {...register('barcode')} isInvalid={!!errors.barcode} />
          <Form.Control.Feedback type="invalid">
            {errors.barcode?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Add Equipment</Button>
      </Form>

      <Modal show={showBarcodeModal} onHide={() => setShowBarcodeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Equipment Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Equipment has been added to the inventory. You can now print the barcode.</p>
          {newEquipment && (
            <BarcodeGenerator 
              value={newEquipment.barcode} 
              name={newEquipment.name} 
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBarcodeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}