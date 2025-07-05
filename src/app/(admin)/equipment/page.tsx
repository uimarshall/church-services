"use client";

import { useState, useEffect } from 'react';
import { Equipment } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
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
import AddEquipmentForm from '@/components/equipment/add-equipment-form';
import EditEquipmentForm from '@/components/equipment/edit-equipment-form';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddEquipmentDialogOpen, setAddEquipmentDialogOpen] = useState(false);
  const [isEditEquipmentDialogOpen, setEditEquipmentDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const res = await fetch('/api/equipment');
        if (!res.ok) {
          throw new Error('Failed to fetch equipment');
        }
        const data = await res.json();
        setEquipment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEquipment();
  }, []);

  const handleAddEquipment = async (newEquipment: Omit<Equipment, 'id'>) => {
    try {
      const res = await fetch('/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipment),
      });

      if (!res.ok) {
        throw new Error('Failed to add equipment');
      }

      const addedEquipment = await res.json();
      setEquipment((prev) => [addedEquipment, ...prev]);
      setAddEquipmentDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEquipment = async (updatedEquipment: Equipment) => {
    try {
      const res = await fetch(`/api/equipment/${updatedEquipment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEquipment),
      });

      if (!res.ok) {
        throw new Error('Failed to update equipment');
      }

      const returnedEquipment = await res.json();
      setEquipment((prev) =>
        prev.map((e) => (e.id === returnedEquipment.id ? returnedEquipment : e))
      );
      setEditEquipmentDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEquipment = async () => {
    if (!selectedEquipment) return;
    try {
      const res = await fetch(`/api/equipment/${selectedEquipment.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete equipment');
      }

      setEquipment((prev) => prev.filter((e) => e.id !== selectedEquipment.id));
      setDeleteConfirmDialogOpen(false);
      setSelectedEquipment(null);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  if (loading) {
    return <div>Loading equipment...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Equipment Management</h1>
        <Dialog open={isAddEquipmentDialogOpen} onOpenChange={setAddEquipmentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <AddEquipmentForm onAddEquipment={handleAddEquipment} />
        </Dialog>
      </div>

      <div className="rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Purchase Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Value</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {equipment.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      item.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'In Use'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-6 py-4">{formatCurrency(item.value)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedEquipment(item);
                      setEditEquipmentDialogOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEquipment(item);
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

      {/* Edit Equipment Dialog */}
      {selectedEquipment && (
        <Dialog open={isEditEquipmentDialogOpen} onOpenChange={setEditEquipmentDialogOpen}>
          <EditEquipmentForm
            equipment={selectedEquipment}
            onUpdateEquipment={handleUpdateEquipment}
          />
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedEquipment && (
        <Dialog open={isDeleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Equipment</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedEquipment.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteEquipment}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
