"use client";

import { useState, useEffect } from 'react';
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

interface EditEquipmentFormProps {
  equipment: Equipment;
  onUpdateEquipment: (updatedEquipment: Equipment) => void;
}

export default function EditEquipmentForm({ equipment, onUpdateEquipment }: EditEquipmentFormProps) {
  const [name, setName] = useState(equipment.name);
  const [description, setDescription] = useState(equipment.description);
  const [quantity, setQuantity] = useState(equipment.quantity);
  const [status, setStatus] = useState(equipment.status);
  const [purchaseDate, setPurchaseDate] = useState(equipment.purchaseDate);
  const [value, setValue] = useState(equipment.value);

  useEffect(() => {
    setName(equipment.name);
    setDescription(equipment.description);
    setQuantity(equipment.quantity);
    setStatus(equipment.status);
    setPurchaseDate(equipment.purchaseDate);
    setValue(equipment.value);
  }, [equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEquipment({ ...equipment, name, description, quantity, status, purchaseDate, value });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Equipment</DialogTitle>
        <DialogDescription>
          Update the details for the equipment below.
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
          <Button type="submit">Update Equipment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
