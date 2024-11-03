import bcrypt from 'bcrypt';

export const encrypt = async (password: string, saltRounds: number = 10) =>
  await bcrypt.hash(password, saltRounds);

export const compare = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
