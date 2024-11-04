'use client';

import { signin } from '@/actions/auth/actions';
import SubmitButton from '@/components/common/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { handleClientError } from '@/lib/errorHandler';

function SigninForm() {
  async function action(formData: FormData) {
    const { error } = await signin(formData);

    if (error) handleClientError(error);
  }

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

export default SigninForm;
