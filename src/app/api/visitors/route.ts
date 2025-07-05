import { NextResponse } from 'next/server';
import { visitors } from '@/lib/data';
import { Visitor } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(visitors);
}

export async function POST(request: Request) {
  const { name, email, phone, visitDate, followUpStatus }: Visitor = await request.json();

  if (!name || !email || !phone || !visitDate || !followUpStatus) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newVisitor: Visitor = {
    id: (visitors.length + 1).toString(),
    name,
    email,
    phone,
    visitDate,
    followUpStatus,
  };

  visitors.push(newVisitor);

  return NextResponse.json(newVisitor, { status: 201 });
}
