'use client';

import { useEffect, useState } from 'react';
import { getUser } from '@/actions/profile/actions';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileForm from './profile-form';
import { User } from '@prisma/client';

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    async function fetchUser() {
      setUser(await getUser());
    }
    fetchUser();
  }, []);

  const handlerUserUpdate = (updatedUser: User) => setUser(updatedUser);

  return (
    <div className="flex items-center justify-center h-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!user ? (
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          ) : (
            <ProfileForm user={user} onUserUpdate={handlerUserUpdate} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
