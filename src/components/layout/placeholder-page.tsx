"use client";

import { usePathname } from 'next/navigation';

export default function PlaceholderPage() {
  const pathname = usePathname();
  const pageName = pathname.split('/').pop();
  const formattedPageName = pageName
    ? pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' ')
    : 'Page';

  return (
    <div>
      <h1 className="text-3xl font-bold">{formattedPageName}</h1>
      <p className="mt-4">This page is under construction.</p>
    </div>
  );
}
