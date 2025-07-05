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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Donor, Campaign, Donation } from '@/lib/definitions';

interface AddDonationFormProps {
  donors: Donor[];
  campaigns: Campaign[];
  onAddDonation: (newDonation: Omit<Donation, 'id'>) => void;
}

export default function AddDonationForm({ donors, campaigns, onAddDonation }: AddDonationFormProps) {
  const [donorId, setDonorId] = useState('');
  const [amount, setAmount] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Bank Transfer' | 'Cash'>('Credit Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorId || !amount || !date || !paymentMethod) {
        return;
    }
    onAddDonation({
      donorId,
      amount: parseFloat(amount),
      campaignId: campaignId || undefined,
      date,
      paymentMethod,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Donation</DialogTitle>
        <DialogDescription>
          Enter the details for the new donation below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div>
          <Label htmlFor="donor">Donor</Label>
          <Select onValueChange={setDonorId} value={donorId} required>
            <SelectTrigger id="donor">
              <SelectValue placeholder="Select a donor" />
            </SelectTrigger>
            <SelectContent>
              {donors.map((donor) => (
                <SelectItem key={donor.id} value={donor.id}>
                  {donor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="campaign">Campaign (Optional)</Label>
          <Select onValueChange={setCampaignId} value={campaignId}>
            <SelectTrigger id="campaign">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select onValueChange={(value) => setPaymentMethod(value as any)} value={paymentMethod} required>
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">Add Donation</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
