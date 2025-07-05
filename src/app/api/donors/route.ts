import { NextResponse } from 'next/server';
import { donors } from '@/lib/data';
import { Donor } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(donors);
}

export async function POST(request: Request) {
  const { name, email }: Donor = await request.json();

  if (!name || !email) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newDonor: Donor = {
    id: (donors.length + 1).toString(),
    name,
    email,
  };

  donors.push(newDonor);

  return NextResponse.json(newDonor, { status: 201 });
}
