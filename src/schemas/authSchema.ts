import { PASSWORD_MIN_LENGTH } from '@/constants';
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
