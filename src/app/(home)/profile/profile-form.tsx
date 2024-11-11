import type { User } from '@prisma/client';
import { Mail, UserIcon, Image as ImageIcon } from 'lucide-react';

import { updateProfile } from '@/actions/profile/actions';
import { handleClientMessage } from '@/lib/toastHandler';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ProfileForm({ user }: { user: User }) {
  async function action(formData: FormData) {
    const { success, error } = await updateProfile(formData);

    if (error) handleClientMessage(error, 'error');
    else if (success) handleClientMessage(success, 'success');
  }

  return (
    <form action={action}>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={user.avatarUrl ? user.avatarUrl : undefined}
            alt={`${user.name}'s avatar`}
          />
          <AvatarFallback>
            <UserIcon size={32} />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="avatarUrl" className="flex items-center space-x-2">
            <ImageIcon className="text-gray-500" size={16} />
            <span>Avatar URL</span>
          </Label>
          <Input
            name="avatarUrl"
            id="avatarUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            defaultValue={user.avatarUrl || ''}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
          />
        </div>

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
