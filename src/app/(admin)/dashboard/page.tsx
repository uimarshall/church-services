"use client";

import { useEffect, useState } from 'react';
import { Member, Donation, Visitor, Equipment } from '@/lib/definitions';
import StatCard from '@/components/dashboard/stat-card';
import { FaUsers, FaHandHoldingHeart, FaUserPlus, FaTools } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [membersRes, donationsRes, visitorsRes, equipmentRes] = await Promise.all([
          fetch('/api/members'),
          fetch('/api/donations'),
          fetch('/api/visitors'),
          fetch('/api/equipment'),
        ]);

        const membersData = await membersRes.json();
        const donationsData = await donationsRes.json();
        const visitorsData = await visitorsRes.json();
        const equipmentData = await equipmentRes.json();

        setMembers(membersData);
        setDonations(donationsData);
        setVisitors(visitorsData);
        setEquipment(equipmentData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const recentDonations = donations.slice(0, 5);
  const recentVisitors = visitors.slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Members" 
          value={members.length.toString()} 
          icon={<FaUsers className="h-4 w-4 text-muted-foreground" />} 
        />
        <StatCard 
          title="Total Donations" 
          value={formatCurrency(totalDonations)} 
          icon={<FaHandHoldingHeart className="h-4 w-4 text-muted-foreground" />} 
          description={`from ${donations.length} gifts`}
        />
        <StatCard 
          title="Recent Visitors" 
          value={visitors.length.toString()} 
          icon={<FaUserPlus className="h-4 w-4 text-muted-foreground" />} 
          description="in the last month"
        />
        <StatCard 
          title="Equipment Items" 
          value={equipment.length.toString()} 
          icon={<FaTools className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentDonations.map(d => (
                <li key={d.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{members.find(m => m.id === d.donorId)?.name || 'Anonymous'}</p>
                    <p className="text-sm text-muted-foreground">{new Date(d.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-bold">{formatCurrency(d.amount)}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentVisitors.map(v => (
                <li key={v.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{v.name}</p>
                    <p className="text-sm text-muted-foreground">Visited on {new Date(v.visitDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      v.followUpStatus === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : v.followUpStatus === 'Contacted'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {v.followUpStatus}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
