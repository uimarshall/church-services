"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Equipment } from '@/lib/definitions';

interface AddEquipmentFormProps {
  onAddEquipment: (newEquipment: Omit<Equipment, 'id'>) => void;
}

export default function AddEquipmentForm({ onAddEquipment }: AddEquipmentFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'Available' | 'In Use' | 'Under Maintenance'>('Available');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [value, setValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEquipment({ name, description, quantity, status, purchaseDate, value });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Equipment</DialogTitle>
        <DialogDescription>
          Enter the details for the new equipment below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="name">Equipment Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required min={0} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setStatus(value as any)} value={status} required>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input id="purchaseDate" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="value">Value ($)</Label>
            <Input id="value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} required min={0} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Equipment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
