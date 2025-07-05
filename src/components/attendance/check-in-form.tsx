"use client";

import { useState } from 'react';
import { Member, Service } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CheckInFormProps {
  members: Member[];
  service: Service;
  attendeeIds: string[];
  onCheckIn: (memberId: string, serviceId: string) => void;
}

export default function CheckInForm({ members, service, attendeeIds, onCheckIn }: CheckInFormProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const unlistedMembers = members.filter((m) => !attendeeIds.includes(m.id));

  const handleCheckIn = () => {
    if (selectedMemberId) {
      onCheckIn(selectedMemberId, service.id);
      setSelectedMemberId(null);
    }
  };

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow">
      <h3 className="text-xl font-semibold">Check-In Member</h3>
      <div className="mt-4 flex items-center space-x-2">
        <Select onValueChange={setSelectedMemberId} value={selectedMemberId || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Select a member to check in" />
          </SelectTrigger>
          <SelectContent>
            {unlistedMembers.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleCheckIn} disabled={!selectedMemberId}>
          Check In
        </Button>
      </div>
    </div>
  );
}
