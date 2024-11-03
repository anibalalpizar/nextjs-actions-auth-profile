'use client';

import { signin } from '@/actions/auth/signin/actions';
import SubmitButton from '@/components/common/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import React from 'react';

function SigninForm() {
  const { toast } = useToast();

  async function action(formData: FormData) {
    const res = await signin(formData);

    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
      });
    }
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
