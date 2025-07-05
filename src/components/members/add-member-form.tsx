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
import { Member } from '@/lib/definitions';

interface AddMemberFormProps {
  onAddMember: (newMember: Omit<Member, 'id' | 'joinDate' | 'status'>) => void;
}

export default function AddMemberForm({ onAddMember }: AddMemberFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember({ name, email, phone });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogDescription>
          Enter the details of the new member below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Add Member</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
