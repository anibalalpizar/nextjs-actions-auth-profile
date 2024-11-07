'use client';

import type { User } from '@prisma/client';
import { Mail, Upload, UserIcon } from 'lucide-react';

import { updateProfile } from '@/actions/profile/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { handleClientMessage } from '@/lib/toastHandler';

function ProfileForm({ user }: { user: User | null }) {
  async function action(formData: FormData) {
    const { success, error } = await updateProfile(formData);

    if (error) handleClientMessage(error, 'error');
    else if (success) handleClientMessage(success, 'success');
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="w-32 h-32 rounded-full" />
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-32 h-6" />
      </div>
    );
  }

  return (
    <form action={action}>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={
              user.avatar ? `data:image/jpeg;base64,${user.avatar}` : undefined
            }
            alt={`${user.name}'s avatar`}
          />
          <AvatarFallback>
            <UserIcon size={32} />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2">
          <Input
            name="avatar"
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Label
            htmlFor="avatar"
            className="cursor-pointer flex items-center space-x-2 text-sm hover:text-gray-800"
          >
            <Upload size={16} />
            <span>Change Photo</span>
          </Label>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center space-x-2">
            <UserIcon className="text-gray-500" size={16} />
            <span>Name</span>
          </Label>
          <Input
            name="name"
            id="name"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            defaultValue={user.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="text-gray-500" size={16} />
            <span>Email</span>
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            defaultValue={user.email}
          />
        </div>
        <Button className="w-full">Save Changes</Button>
      </div>
    </form>
  );
}

export default ProfileForm;
