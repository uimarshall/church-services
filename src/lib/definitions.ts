export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'New';
  joinDate: string;
}

export interface Service {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  serviceId: string;
  checkInTime: string; // ISO 8601 format
}

export interface Campaign {
  id: string;
  name: string;
  goal: number;
  description: string;
}

export interface Donor {
  id: string; // Can be the same as memberId if the donor is a member
  name: string;
  email: string;
}

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  campaignId?: string; // Optional: link to a specific campaign
  date: string; // YYYY-MM-DD
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Cash';
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string; // YYYY-MM-DD
  followUpStatus: 'Pending' | 'Contacted' | 'Completed';
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  quantity: number;
  status: 'Available' | 'In Use' | 'Under Maintenance';
  purchaseDate: string;
  value: number;
}
