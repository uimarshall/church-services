"use client";

"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddMemberForm from '@/components/members/add-member-form';
import EditMemberForm from '@/components/members/edit-member-form';
import { Member } from '@/lib/definitions';

async function fetchMembers(): Promise<Member[]> {
  const res = await fetch('/api/members');
  if (!res.ok) {
    throw new Error('Failed to fetch members');
  }
  return res.json();
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const handleAddMember = async (newMember: Omit<Member, 'id' | 'joinDate' | 'status'>) => {
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember),
    });

    if (res.ok) {
      const addedMember = await res.json();
      setMembers((prev) => [...prev, addedMember]);
      setAddDialogOpen(false);
    }
  };

  const handleUpdateMember = async (updatedMember: Member) => {
    const res = await fetch(`/api/members/${updatedMember.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMember),
    });

    if (res.ok) {
      const member = await res.json();
      setMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
      setEditDialogOpen(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });

      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <AddMemberForm onAddMember={handleAddMember} />
        </Dialog>
      </div>
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Join Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              members.map((member) => (
              <tr key={member.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{member.email}</div>
                  <div className="text-sm text-gray-500">{member.phone}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : member.status === 'Inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {member.joinDate}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Dialog open={isEditDialogOpen && selectedMember?.id === member.id} onOpenChange={(isOpen: boolean) => {
                    if (!isOpen) setSelectedMember(null);
                    setEditDialogOpen(isOpen);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
                        <FaEdit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </DialogTrigger>
                    {selectedMember && <EditMemberForm member={selectedMember} onUpdateMember={handleUpdateMember} />}
                  </Dialog>

                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteMember(member.id)}>
                    <FaTrash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
