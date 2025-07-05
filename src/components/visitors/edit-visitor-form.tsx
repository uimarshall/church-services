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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Visitor } from '@/lib/definitions';

interface EditVisitorFormProps {
  visitor: Visitor;
  onUpdateVisitor: (updatedVisitor: Visitor) => void;
}

export default function EditVisitorForm({ visitor, onUpdateVisitor }: EditVisitorFormProps) {
  const [name, setName] = useState(visitor.name);
  const [email, setEmail] = useState(visitor.email);
  const [phone, setPhone] = useState(visitor.phone);
  const [visitDate, setVisitDate] = useState(visitor.visitDate);
  const [followUpStatus, setFollowUpStatus] = useState(visitor.followUpStatus);

  useEffect(() => {
    setName(visitor.name);
    setEmail(visitor.email);
    setPhone(visitor.phone);
    setVisitDate(visitor.visitDate);
    setFollowUpStatus(visitor.followUpStatus);
  }, [visitor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateVisitor({ ...visitor, name, email, phone, visitDate, followUpStatus });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Visitor</DialogTitle>
        <DialogDescription>
          Update the details for the visitor below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="visitDate">Visit Date</Label>
          <Input id="visitDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="followUpStatus">Follow-up Status</Label>
          <Select onValueChange={(value) => setFollowUpStatus(value as any)} value={followUpStatus} required>
            <SelectTrigger id="followUpStatus">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Update Visitor</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
