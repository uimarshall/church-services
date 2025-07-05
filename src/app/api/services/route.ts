import { NextResponse } from 'next/server';
import { services } from '@/lib/data';
import { Service } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const { name, date, time } = await request.json();

  if (!name || !date || !time) {
    return NextResponse.json(
      { message: 'Name, date, and time are required' },
      { status: 400 }
    );
  }

  const newService: Service = {
    id: (services.length + 1).toString(),
    name,
    date,
    time,
  };

  services.push(newService);

  return NextResponse.json(newService, { status: 201 });
}
