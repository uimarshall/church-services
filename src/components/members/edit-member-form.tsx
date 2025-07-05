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
import { Member } from '@/lib/definitions';

interface EditMemberFormProps {
  member: Member;
  onUpdateMember: (updatedMember: Member) => void;
}

export default function EditMemberForm({ member, onUpdateMember }: EditMemberFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setEmail(member.email);
      setPhone(member.phone);
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMember({ ...member, name, email, phone });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogDescription>
          Update the details of the member below.
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
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
