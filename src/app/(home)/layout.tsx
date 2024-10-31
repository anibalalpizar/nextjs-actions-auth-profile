// import { getSession } from '@/lib/session';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getSession();
  return children;
}
