import { NextResponse } from 'next/server';
import { members } from '@/lib/data';
import { Member } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const { name, email, phone } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Name and email are required' },
      { status: 400 }
    );
  }

  const newMember: Member = {
    id: (members.length + 1).toString(),
    name,
    email,
    phone,
    status: 'New',
    joinDate: new Date().toISOString().split('T')[0],
  };

  members.push(newMember);

  return NextResponse.json(newMember, { status: 201 });
}
