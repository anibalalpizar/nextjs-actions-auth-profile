'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';
import { getAuthenticatedSession } from '@/lib/session';

import { prisma } from '@/lib/prisma';
import { getChangedFields } from '@/lib/utils';
import { profileSchema } from '@/schemas/profileSchema';

export const getUser = async () => getAuthenticatedSession();

export const updateProfile = async (formData: FormData) => {
  const user = await getAuthenticatedSession();
  if (!user) return redirect(ROUTES.SIGN_IN);

  const rawFormData = Object.fromEntries(formData.entries());

  const parseData = profileSchema.safeParse(rawFormData);

  if (!parseData.success)
    return {
      error: 'Invalid data',
    };

  const changedFields = getChangedFields(user, {
    ...user,
    ...parseData.data,
  });

  if (!changedFields)
    return {
      error: 'No changes detected',
    };

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: changedFields,
  });

  revalidatePath(ROUTES.PROFILE);

  return {
    success: 'Profile updated',
    updatedUser,
  };
};
