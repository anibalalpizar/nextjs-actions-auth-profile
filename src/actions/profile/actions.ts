'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';
import { getAuthenticatedSession } from '@/lib/session';

import { prisma } from '@/lib/prisma';
import { getChangedFields } from '@/lib/utils';
import { profileSchema } from '@/schemas/profileSchema';

export const getUser = async () => {
  const user = await getAuthenticatedSession();

  if (!user) return null;

  if (user.avatar) user.avatar = user.avatar.toString('base64');

  return user;
};

export const updateProfile = async (formData: FormData) => {
  const user = await getAuthenticatedSession();
  if (!user) return redirect(ROUTES.SIGN_IN);

  const rawFormData = Object.fromEntries(formData.entries());

  const parseData = profileSchema.safeParse(rawFormData);

  if (!parseData.success) {
    return {
      error: 'Invalid data',
    };
  }

  const avatarFile = formData.get('avatar') as File | null;
  let avatar: Buffer | null = null;

  if (avatarFile) avatar = Buffer.from(await avatarFile.arrayBuffer());

  const changedFields = getChangedFields<typeof parseData.data>(
    user,
    parseData.data
  );

  if (avatar) changedFields.avatar = avatar;

  if (Object.keys(changedFields).length === 0)
    return {
      error: 'No changes detected',
    };

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: changedFields,
  });

  revalidatePath(ROUTES.PROFILE);

  return {
    success: 'Profile updated',
  };
};
