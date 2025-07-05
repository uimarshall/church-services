import { NextResponse } from 'next/server';
import { equipment } from '@/lib/data';
import { Equipment } from '@/lib/definitions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = equipment.find((e) => e.id === params.id);
  if (item) {
    return NextResponse.json(item);
  } else {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = equipment.findIndex((e) => e.id === params.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 });
  }

  const updatedItem: Equipment = await request.json();
  equipment[index] = { ...equipment[index], ...updatedItem };

  return NextResponse.json(equipment[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = equipment.findIndex((e) => e.id === params.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 });
  }

  equipment.splice(index, 1);

  return new NextResponse(null, { status: 204 });
}
