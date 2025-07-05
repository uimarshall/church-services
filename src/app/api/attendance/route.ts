import { NextResponse } from 'next/server';
import { attendanceRecords, members, services } from '@/lib/data';
import { AttendanceRecord } from '@/lib/definitions';

export async function GET() {
  // Optionally, enrich the data with member and service names
  const enrichedRecords = attendanceRecords.map((record) => {
    const member = members.find((m) => m.id === record.memberId);
    const service = services.find((s) => s.id === record.serviceId);
    return {
      ...record,
      memberName: member?.name || 'Unknown Member',
      serviceName: service?.name || 'Unknown Service',
    };
  });
  return NextResponse.json(enrichedRecords);
}

export async function POST(request: Request) {
  const { memberId, serviceId } = await request.json();

  if (!memberId || !serviceId) {
    return NextResponse.json(
      { message: 'Member ID and Service ID are required' },
      { status: 400 }
    );
  }

  const newRecord: AttendanceRecord = {
    id: (attendanceRecords.length + 1).toString(),
    memberId,
    serviceId,
    checkInTime: new Date().toISOString(),
  };

  attendanceRecords.push(newRecord);

  return NextResponse.json(newRecord, { status: 201 });
}
