import { NextResponse } from 'next/server';
import { visitors } from '@/lib/data';
import { Visitor } from '@/lib/definitions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const visitor = visitors.find((v) => v.id === params.id);
  if (visitor) {
    return NextResponse.json(visitor);
  } else {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = visitors.findIndex((v) => v.id === params.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }

  const updatedVisitor: Visitor = await request.json();
  visitors[index] = { ...visitors[index], ...updatedVisitor };

  return NextResponse.json(visitors[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = visitors.findIndex((v) => v.id === params.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Visitor not found' }, { status: 404 });
  }

  visitors.splice(index, 1);

  return new NextResponse(null, { status: 204 });
}
