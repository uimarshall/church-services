"use client";

import { useState, useEffect, useMemo } from 'react';
import { Visitor } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import AddVisitorForm from '@/components/visitors/add-visitor-form';
import EditVisitorForm from '@/components/visitors/edit-visitor-form';

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddVisitorDialogOpen, setAddVisitorDialogOpen] = useState(false);
  const [isEditVisitorDialogOpen, setEditVisitorDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const res = await fetch('/api/visitors');
        if (!res.ok) {
          throw new Error('Failed to fetch visitors');
        }
        const data = await res.json();
        setVisitors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVisitors();
  }, []);

  const handleAddVisitor = async (newVisitor: Omit<Visitor, 'id'>) => {
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVisitor),
      });

      if (!res.ok) {
        throw new Error('Failed to add visitor');
      }

      const addedVisitor = await res.json();
      setVisitors((prev) => [addedVisitor, ...prev]);
      setAddVisitorDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVisitor = async (updatedVisitor: Visitor) => {
    try {
      const res = await fetch(`/api/visitors/${updatedVisitor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVisitor),
      });

      if (!res.ok) {
        throw new Error('Failed to update visitor');
      }

      const returnedVisitor = await res.json();
      setVisitors((prev) =>
        prev.map((v) => (v.id === returnedVisitor.id ? returnedVisitor : v))
      );
      setEditVisitorDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVisitor = async () => {
    if (!selectedVisitor) return;
    try {
      const res = await fetch(`/api/visitors/${selectedVisitor.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete visitor');
      }

      setVisitors((prev) => prev.filter((v) => v.id !== selectedVisitor.id));
      setDeleteConfirmDialogOpen(false);
      setSelectedVisitor(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredVisitors = useMemo(() => {
    return visitors
      .filter((visitor) =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((visitor) =>
        statusFilter === 'All' ? true : visitor.followUpStatus === statusFilter
      );
  }, [visitors, searchTerm, statusFilter]);

  if (loading) {
    return <div>Loading visitors...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visitor Management</h1>
        <Dialog open={isAddVisitorDialogOpen} onOpenChange={setAddVisitorDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" />
              Add Visitor
            </Button>
          </DialogTrigger>
          <AddVisitorForm onAddVisitor={handleAddVisitor} />
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Visit Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Follow-up Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredVisitors.map((visitor) => (
              <tr key={visitor.id}>
                <td className="whitespace-nowrap px-6 py-4">{visitor.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div>{visitor.email}</div>
                  <div>{visitor.phone}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{new Date(visitor.visitDate).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      visitor.followUpStatus === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : visitor.followUpStatus === 'Contacted'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {visitor.followUpStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedVisitor(visitor);
                      setEditVisitorDialogOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVisitor(visitor);
                      setDeleteConfirmDialogOpen(true);
                    }}
                    className="ml-4 text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Visitor Dialog */}
      {selectedVisitor && (
        <Dialog open={isEditVisitorDialogOpen} onOpenChange={setEditVisitorDialogOpen}>
          <EditVisitorForm
            visitor={selectedVisitor}
            onUpdateVisitor={handleUpdateVisitor}
          />
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedVisitor && (
        <Dialog open={isDeleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Visitor</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedVisitor.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteVisitor}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
