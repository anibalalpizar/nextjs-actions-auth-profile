'use server';

import { compare } from '@/lib/encrypt';
import prisma from '@/lib/prisma';
import { getAuthenticatedSession, setSession } from '@/lib/session';
import { signinSchema } from '@/schemas/authSchema';
import { redirect } from 'next/navigation';

export const signin = async (formData: FormData) => {
  const user = await getAuthenticatedSession();

  if (user) {
    return {
      error: 'You are already logged in',
    };
  }

  const rawFormData = Object.fromEntries(formData.entries());

  const parseData = signinSchema.safeParse(rawFormData);

  if (!parseData.success) {
    return {
      error: 'Invalid data',
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: parseData.data.email.toLowerCase(),
    },
  });

  if (!userExists) {
    return {
      error: 'User not found',
    };
  }

  const passwordMatch = await compare(
    parseData.data.password,
    userExists.password
  );

  if (!passwordMatch) {
    return {
      error: 'Invalid password',
    };
  }

  await setSession({
    id: userExists.id,
    email: userExists.email,
  });

  return redirect('/');
};
