import { SALT_ROUNDS } from '@/constants/validation';
import bcrypt from 'bcrypt';

export const encrypt = async (
  password: string,
  saltRounds: number = SALT_ROUNDS
) => await bcrypt.hash(password, saltRounds);

export const compare = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
