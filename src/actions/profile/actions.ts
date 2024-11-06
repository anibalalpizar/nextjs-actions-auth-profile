'use server';

import { getAuthenticatedSession } from '@/lib/session';

export const getUser = async () => await getAuthenticatedSession();
