import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
