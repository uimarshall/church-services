"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    router.push('/auth/login');
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard!</p>
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </div>
  );
}
