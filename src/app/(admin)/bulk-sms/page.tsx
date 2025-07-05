"use client";

import { useState, useEffect } from 'react';
import { Member } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox'; // Assuming a Checkbox component exists or will be created

export default function BulkSmsPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch('/api/members');
        if (!res.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((m) => m.id));
    }
  };

  const handleSendMessage = async () => {
    if (selectedMembers.length === 0) {
      alert('Please select at least one member.');
      return;
    }
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }

    try {
      const res = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, recipientIds: selectedMembers }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully (simulated).');
      setMessage('');
      setSelectedMembers([]);
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the message.');
    }
  };

  if (loading) {
    return <div>Loading members...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Bulk SMS Service</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow md:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">Select Recipients</h2>
          <div className="mb-4 flex items-center">
            <Checkbox
              id="select-all"
              checked={selectedMembers.length === members.length && members.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="ml-2 font-medium">
              Select All
            </Label>
          </div>
          <div className="max-h-96 space-y-2 overflow-y-auto border-t pt-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center">
                <Checkbox
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => handleSelectMember(member.id)}
                />
                <Label htmlFor={`member-${member.id}`} className="ml-2">
                  {member.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Compose Message</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={10}
              />
              <p className="mt-2 text-right text-sm text-gray-500">
                {message.length} / 160 characters
              </p>
            </div>
            <Button onClick={handleSendMessage} className="w-full">
              Send Message to {selectedMembers.length} Member(s)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
