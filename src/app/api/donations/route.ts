import { NextResponse } from 'next/server';
import { donations } from '@/lib/data';
import { Donation } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(donations);
}

export async function POST(request: Request) {
  const { donorId, amount, campaignId, date, paymentMethod }: Donation = await request.json();

  if (!donorId || !amount || !date || !paymentMethod) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newDonation: Donation = {
    id: (donations.length + 1).toString(),
    donorId,
    amount,
    campaignId,
    date,
    paymentMethod,
  };

  donations.push(newDonation);

  return NextResponse.json(newDonation, { status: 201 });
}
