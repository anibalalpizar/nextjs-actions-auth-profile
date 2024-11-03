import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import prisma from './prisma';

const { SESSION_SECRET, SESSION_NAME, NODE_ENV } = process.env;

type Session = {
  id?: number;
  email?: string;
};

async function getSession() {
  const cookieStore = await cookies();

  const session = await getIronSession<Session>(cookieStore, {
    password: SESSION_SECRET!,
    cookieName: SESSION_NAME!,
    cookieOptions: {
      secure: NODE_ENV === 'production',
      httpOnly: NODE_ENV === 'production',
    },
  });
  return session;
}

export async function getAuthenticatedSession() {
  const session = await getSession();

  const userId = session.id;

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return user;
}

export async function setSession(data: Session) {
  const session = await getSession();

  session.id = data.id;
  session.email = data.email;

  await session.save();
}

export async function removeSession() {
  const session = await getSession();

  session.destroy();
}
