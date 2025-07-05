import { NextResponse } from 'next/server';
import { members } from '@/lib/data';
import { Member } from '@/lib/definitions';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const member = members.find((m) => m.id === params.id);
  if (member) {
    return NextResponse.json(member);
  } else {
    return NextResponse.json({ message: 'Member not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = members.findIndex((m) => m.id === params.id);
  if (index !== -1) {
    const updatedMember = await request.json();
    members[index] = { ...members[index], ...updatedMember };
    return NextResponse.json(members[index]);
  } else {
    return NextResponse.json({ message: 'Member not found' }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = members.findIndex((m) => m.id === params.id);
  if (index !== -1) {
    const deletedMember = members.splice(index, 1);
    return NextResponse.json(deletedMember[0]);
  } else {
    return NextResponse.json({ message: 'Member not found' }, { status: 404 });
  }
}
