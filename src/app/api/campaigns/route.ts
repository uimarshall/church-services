import { NextResponse } from 'next/server';
import { campaigns } from '@/lib/data';
import { Campaign } from '@/lib/definitions';

export async function GET() {
  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  const { name, goal, description }: Campaign = await request.json();

  if (!name || !goal || !description) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newCampaign: Campaign = {
    id: (campaigns.length + 1).toString(),
    name,
    goal,
    description,
  };

  campaigns.push(newCampaign);

  return NextResponse.json(newCampaign, { status: 201 });
}
