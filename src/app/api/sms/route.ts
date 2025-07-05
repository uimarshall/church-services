import { NextResponse } from 'next/server';
import { members } from '@/lib/data';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return NextResponse.json(
      { message: 'Twilio environment variables are not configured on the server.' },
      { status: 500 }
    );
  }

  const { message, recipientIds } = await request.json();

  if (!message || !recipientIds || recipientIds.length === 0) {
    return NextResponse.json({ message: 'Message and recipients are required' }, { status: 400 });
  }

  const recipients = members.filter((member) => recipientIds.includes(member.id));
  const phoneNumbers = recipients.map((member) => member.phone).filter(Boolean); // Ensure no null/undefined phones

  if (phoneNumbers.length === 0) {
    return NextResponse.json({ message: 'No valid recipients found' }, { status: 400 });
  }

  try {
    const messagePromises = phoneNumbers.map((phoneNumber) => {
      return client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });
    });

    await Promise.all(messagePromises);

    return NextResponse.json({ message: 'Messages sent successfully!' });
  } catch (error) {
    console.error('Twilio Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to send messages', error: errorMessage }, { status: 500 });
  }
}
