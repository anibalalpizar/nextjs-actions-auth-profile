'use server';

import {
  compare,
  encrypt,
  getAuthenticatedSession,
  prisma,
  removeSession,
  setSession,
} from '@/lib';
import { signinSchema, signupSchema } from '@/schemas/authSchema';
import { revalidatePath } from 'next/cache';
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

  revalidatePath('/');
  return redirect('/');
};

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

  revalidatePath('/');
  return redirect('/');
};

export const signout = async () => await removeSession();
