import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});
