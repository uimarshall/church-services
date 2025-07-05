"use client";

import { useState, useEffect } from 'react';
import { Donation, Campaign, Donor } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddDonationForm from '@/components/finance/add-donation-form';

// Enriched donation for UI
interface EnrichedDonation extends Donation {
  donorName: string;
  campaignName?: string;
}

export default function FinancePage() {
  const [donations, setDonations] = useState<EnrichedDonation[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isAddDonationDialogOpen, setAddDonationDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [donationsRes, campaignsRes, donorsRes] = await Promise.all([
          fetch('/api/donations'),
          fetch('/api/campaigns'),
          fetch('/api/donors'),
        ]);

        if (!donationsRes.ok || !campaignsRes.ok || !donorsRes.ok) {
          throw new Error('Failed to fetch finance data');
        }

        const donationsData = await donationsRes.json();
        const campaignsData = await campaignsRes.json();
        const donorsData = await donorsRes.json();

        setCampaigns(campaignsData);
        setDonors(donorsData);

        // Enrich donations with donor and campaign names
        const enriched = donationsData.map((d: Donation) => ({
          ...d,
          donorName: donorsData.find((dnr: Donor) => dnr.id === d.donorId)?.name || 'Unknown',
          campaignName: campaignsData.find((c: Campaign) => c.id === d.campaignId)?.name,
        }));
        setDonations(enriched);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddDonation = async (newDonation: Omit<Donation, 'id'>) => {
    const res = await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDonation),
    });

    if (res.ok) {
      const addedDonation = await res.json();
      const enrichedDonation: EnrichedDonation = {
        ...addedDonation,
        donorName: donors.find((d) => d.id === addedDonation.donorId)?.name || 'Unknown',
        campaignName: campaigns.find((c) => c.id === addedDonation.campaignId)?.name,
      };
      setDonations((prev) => [enrichedDonation, ...prev]);
      setAddDonationDialogOpen(false);
    }
  };

  const totalDonations = donations.reduce((acc, d) => acc + d.amount, 0);

  if (loading) {
    return <div>Loading financial data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Overview</h1>
        <Dialog open={isAddDonationDialogOpen} onOpenChange={setAddDonationDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" />
              Add Donation
            </Button>
          </DialogTrigger>
          <AddDonationForm
            donors={donors}
            campaigns={campaigns}
            onAddDonation={handleAddDonation}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-500">Total Donations</h3>
          <p className="mt-2 text-4xl font-bold">${totalDonations.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-500">Campaigns</h3>
          <p className="mt-2 text-4xl font-bold">{campaigns.length}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-500">Donors</h3>
          <p className="mt-2 text-4xl font-bold">{donors.length}</p>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div>
        <h2 className="text-2xl font-bold">Recent Donations</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Payment Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {donations.slice(0, 5).map((donation) => (
                <tr key={donation.id}>
                  <td className="whitespace-nowrap px-6 py-4">{new Date(donation.date).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap px-6 py-4">{donation.donorName}</td>
                  <td className="whitespace-nowrap px-6 py-4">${donation.amount.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-6 py-4">{donation.campaignName || 'N/A'}</td>
                  <td className="whitespace-nowrap px-6 py-4">{donation.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
