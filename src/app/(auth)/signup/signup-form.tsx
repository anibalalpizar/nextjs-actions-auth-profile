'use client';

import { signup } from '@/actions/auth/actions';
import SubmitButton from '@/components/common/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PASSWORD_MIN_LENGTH } from '@/constants';
import { handleClientError } from '@/lib/errorHandler';

function SignupForm() {
  async function action(formData: FormData) {
    const { error } = await signup(formData);

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
            placeholder="joe@gmail.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="********"
            required
            minLength={PASSWORD_MIN_LENGTH}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="Name">Name</Label>
          </div>
          <Input name="name" id="name" placeholder="John Doe" required />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

export default SignupForm;
