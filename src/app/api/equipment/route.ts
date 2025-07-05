import { NextResponse } from 'next/server';
import { equipment } from '@/lib/data';
import { Equipment } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(equipment);
}

export async function POST(request: Request) {
  const { name, description, quantity, status, purchaseDate, value }: Equipment = await request.json();

  if (!name || !description || quantity === undefined || !status || !purchaseDate || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newEquipment: Equipment = {
    id: (equipment.length + 1).toString(),
    name,
    description,
    quantity,
    status,
    purchaseDate,
    value,
  };

  equipment.push(newEquipment);

  return NextResponse.json(newEquipment, { status: 201 });
}
