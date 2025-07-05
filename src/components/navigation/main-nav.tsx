import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="/members" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Members
      </Link>
      <Link href="/attendance" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Attendance
      </Link>
      <Link href="/finance" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Finance
      </Link>
    </nav>
  );
}
