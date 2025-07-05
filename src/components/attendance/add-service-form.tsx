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
import { Service } from '@/lib/definitions';

interface AddServiceFormProps {
  onAddService: (newService: Omit<Service, 'id'>) => void;
}

export default function AddServiceForm({ onAddService }: AddServiceFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddService({ name, date, time });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogDescription>
          Enter the details for the new service below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div>
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <DialogFooter>
          <Button type="submit">Add Service</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
