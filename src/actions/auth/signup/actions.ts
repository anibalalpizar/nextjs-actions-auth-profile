'use server';

import { encrypt } from '@/lib/encrypt';
import prisma from '@/lib/prisma';
import { getAuthenticatedSession, setSession } from '@/lib/session';
import { signupSchema } from '@/schemas/authSchema';
import { redirect } from 'next/navigation';

export const signup = async (formData: FormData) => {
  const user = await getAuthenticatedSession();

  if (user) {
    return {
      error: 'You are already logged in',
    };
  }

  const rawFormData = Object.fromEntries(formData.entries());

  const parseData = signupSchema.safeParse(rawFormData);

  if (!parseData.success) {
    return {
      error: 'Invalid data',
    };
  }

  const passwordHash = await encrypt(parseData.data.password, 10);

  const userCreated = await prisma.user.create({
    data: {
      name: parseData.data.name,
      email: parseData.data.email.toLowerCase(),
      password: passwordHash,
    },
  });

  await setSession({
    id: userCreated.id,
    email: userCreated.email,
  });

  return redirect('/');
};
