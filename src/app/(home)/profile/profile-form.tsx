import { Mail, Upload, UserIcon } from 'lucide-react';

import { getUser } from '@/actions/profile/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

async function ProfileForm() {
  const user = await getUser();
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
    <>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/82195641?v=4"
            alt="Profile picture"
          />
          <AvatarFallback>
            <UserIcon size={32} />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2">
          <Input id="avatar" type="file" accept="image/*" className="hidden" />
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
            id="email"
            type="email"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            defaultValue={user.email}
          />
        </div>
        <Button className="w-full">Save Changes</Button>
      </div>
    </>
  );
}

export default ProfileForm;
