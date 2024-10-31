import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const { SECRET_COOKIE_PASSWORD, SESSION_NAME } = process.env;

type Session = {
  id?: number;
  email?: string;
};

export async function getSession() {
  const cookieStore = await cookies();

  const session = await getIronSession<Session>(cookieStore, {
    password: SECRET_COOKIE_PASSWORD!,
    cookieName: SESSION_NAME!,
  });
  return session;
}

export async function getAuthenticatedSession() {
  const session = await getSession();

  if (!session.id) return null;

  return session;
}

export async function setSession(data: Session) {
  const session = await getSession();

  session.id = data.id;
  session.email = data.email;

  await session.save();
}
