import { getAuthenticatedSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedSession();

  if (user) return redirect('/');

  return children;
}
