import { redirect } from 'next/navigation';
import { getAuthenticatedSession } from '@/lib/session';

import { Navbar } from '@/components/layout/navbar';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedSession();

  if (!user) return redirect('/signin');

  return (
    <>
      <nav className="flex flex-col items-center justify-center">
        <Navbar user={user} />
      </nav>
      <main className="container mx-auto">{children}</main>
    </>
  );
}
