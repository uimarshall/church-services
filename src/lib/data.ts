import { Member, Service, AttendanceRecord, Campaign, Donor, Donation, Visitor, Equipment } from './definitions';
import { mockMembers } from './mock-data';

// This is a temporary in-memory data store.
// In a real application, this would be a database.
export let members: Member[] = [...mockMembers];

export let services: Service[] = [
  {
    id: '1',
    name: 'Sunday Morning Service',
    date: '2023-10-29',
    time: '10:00',
  },
  {
    id: '2',
    name: 'Wednesday Bible Study',
    date: '2023-11-01',
    time: '19:00',
  },
];

export let attendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    memberId: '1',
    serviceId: '1',
    checkInTime: '2023-10-29T10:05:00Z',
  },
  {
    id: '2',
    memberId: '2',
    serviceId: '1',
    checkInTime: '2023-10-29T10:02:00Z',
  },
  {
    id: '3',
    memberId: '1',
    serviceId: '2',
    checkInTime: '2023-11-01T19:03:00Z',
  },
];

export let campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Building Fund',
    goal: 50000,
    description: 'Raising funds for the new church building extension.',
  },
  {
    id: '2',
    name: 'Missionary Support',
    goal: 10000,
    description: 'Supporting our missionaries abroad.',
  },
];

export let donors: Donor[] = [
  { id: '1', name: 'John Doe', email: 'john.d@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.s@example.com' },
  { id: '3', name: 'Anonymous', email: '' },
];

export let donations: Donation[] = [
  {
    id: '1',
    donorId: '1',
    amount: 100,
    campaignId: '1',
    date: '2023-10-15',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    donorId: '2',
    amount: 50,
    date: '2023-10-18',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '3',
    donorId: '1',
    amount: 200,
    campaignId: '1',
    date: '2023-10-22',
    paymentMethod: 'Credit Card',
  },
  {
    id: '4',
    donorId: '3',
    amount: 20,
    date: '2023-10-25',
    paymentMethod: 'Cash',
  },
];

export let visitors: Visitor[] = [
  {
    id: '1',
    name: 'Tom Holland',
    email: 'tom.h@example.com',
    phone: '123-456-7890',
    visitDate: '2023-10-29',
    followUpStatus: 'Pending',
  },
  {
    id: '2',
    name: 'Zendaya Coleman',
    email: 'zendaya.c@example.com',
    phone: '234-567-8901',
    visitDate: '2023-10-29',
    followUpStatus: 'Contacted',
  },
  {
    id: '3',
    name: 'Jacob Batalon',
    email: 'jacob.b@example.com',
    phone: '345-678-9012',
    visitDate: '2023-11-05',
    followUpStatus: 'Completed',
  },
];

export let equipment: Equipment[] = [
  {
    id: '1',
    name: 'PA System',
    description: 'Main sound system for the auditorium',
    quantity: 1,
    status: 'Available',
    purchaseDate: '2022-01-15',
    value: 2500,
  },
  {
    id: '2',
    name: 'Projector',
    description: 'Ceiling-mounted projector for presentations',
    quantity: 1,
    status: 'In Use',
    purchaseDate: '2021-08-20',
    value: 1200,
  },
  {
    id: '3',
    name: 'Microphones',
    description: 'Wireless handheld microphones',
    quantity: 4,
    status: 'Available',
    purchaseDate: '2022-05-10',
    value: 800,
  },
  {
    id: '4',
    name: 'Folding Chairs',
    description: 'Extra chairs for events',
    quantity: 50,
    status: 'Under Maintenance',
    purchaseDate: '2020-03-01',
    value: 1500,
  },
];
