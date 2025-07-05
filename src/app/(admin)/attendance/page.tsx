"use client";

import { useState, useEffect, useMemo } from 'react';
import { Service, Member, AttendanceRecord } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import CheckInForm from '@/components/attendance/check-in-form';
import AddServiceForm from '@/components/attendance/add-service-form';

// Enriched record type for UI
interface EnrichedAttendanceRecord extends AttendanceRecord {
  memberName: string;
  serviceName: string;
}

export default function AttendancePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [records, setRecords] = useState<EnrichedAttendanceRecord[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddServiceDialogOpen, setAddServiceDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, membersRes, recordsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/members'),
          fetch('/api/attendance'),
        ]);

        if (!servicesRes.ok || !membersRes.ok || !recordsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const servicesData = await servicesRes.json();
        setServices(servicesData);
        setMembers(await membersRes.json());
        setRecords(await recordsRes.json());

        if (servicesData.length > 0) {
          setSelectedService(servicesData[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const attendees = useMemo(() => {
    if (!selectedService) return [];
    return records.filter((r) => r.serviceId === selectedService.id);
  }, [records, selectedService]);

  const handleCheckIn = async (memberId: string, serviceId: string) => {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, serviceId }),
    });

    if (res.ok) {
      const newRecord = await res.json();
      const member = members.find((m) => m.id === newRecord.memberId);
      const service = services.find((s) => s.id === newRecord.serviceId);

      const enrichedRecord: EnrichedAttendanceRecord = {
        ...newRecord,
        memberName: member?.name || 'Unknown Member',
        serviceName: service?.name || 'Unknown Service',
      };

      setRecords((prev) => [...prev, enrichedRecord]);
    }
  };

  const handleAddService = async (newService: Omit<Service, 'id'>) => {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });

    if (res.ok) {
      const addedService = await res.json();
      setServices((prev) => [...prev, addedService]);
      setAddServiceDialogOpen(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Services List */}
      <div className="md:col-span-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Services</h2>
          <Dialog open={isAddServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <FaPlus className="mr-2" />
                New Service
              </Button>
            </DialogTrigger>
            <AddServiceForm onAddService={handleAddService} />
          </Dialog>
        </div>
        <div className="mt-4 space-y-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`w-full rounded-lg p-4 text-left shadow transition-colors ${
                selectedService?.id === service.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}>
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm">
                {new Date(service.date).toLocaleDateString()} - {service.time}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Attendance Details */}
      <div className="md:col-span-2">
        {selectedService ? (
          <div>
            <h2 className="text-2xl font-bold">{selectedService.name}</h2>
            <p className="text-muted-foreground">
              Attendance for {new Date(selectedService.date).toLocaleDateString()}
            </p>

            <CheckInForm
              members={members}
              service={selectedService}
              attendeeIds={attendees.map((a) => a.memberId)}
              onCheckIn={handleCheckIn}
            />

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Attendees ({attendees.length})</h3>
              <div className="mt-4 rounded-lg bg-white shadow">
                <ul className="divide-y divide-gray-200">
                  {attendees.map((record) => (
                    <li key={record.id} className="px-6 py-4">
                      <p className="font-medium">{record.memberName}</p>
                      <p className="text-sm text-gray-500">
                        Checked in at {new Date(record.checkInTime).toLocaleTimeString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p>Select a service to view attendance.</p>
        )}
      </div>
    </div>
  );
}
