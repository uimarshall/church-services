"use client";

import { menuItems } from '@/config/menu-items';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-[#082156] to-[#EA6F66] text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Church Admin</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={`flex items-center p-4 hover:bg-white/10 ${pathname === item.path ? 'bg-white/20' : ''}`}>
                <item.icon className="mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
