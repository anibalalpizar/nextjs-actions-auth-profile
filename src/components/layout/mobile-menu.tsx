import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function MobileNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Link href="/" className="font-bold">
        My App
      </Link>
      <Link href="/docs" className="font-medium">
        Documentation
      </Link>
      <Link href="/docs/components" className="font-medium">
        Components
      </Link>
      <Button className="w-full">Sign Up</Button>
    </div>
  );
}
