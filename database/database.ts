import { CookieDB } from "cookiedb";
import { create, getNumericDate } from "djwt";

interface User {
  google?: string;
  github?: string;
  refreshToken: string;
  key: string;
}

const userKeys = [
  "google",
  "github",
  "refreshToken"
]

const cookieDB = new CookieDB(
  "https://cookiedb.com/api/db",
  Deno.env.get("COOKIE_TOKEN") as string
);

/**
 * @param identifier
 * @param type
 * @returns refreshToken
 */
export async function addUser(identifier: string, type: 'google' | 'github') {
  const refreshToken = await create({
    alg: "HS512",
    typ: "JWT",
  }, {exp: getNumericDate(4 * 60 * 60)}, "secret");

  const payload: any = {
    [type]: identifier,
    refreshToken,
  }
  // go through the User keys
  // if the key is not in the payload, add it
  for (const key of userKeys) {
    if (payload[key] === undefined) {
      payload[key] = "";
    }
  }
  await cookieDB.insert('users', payload);
  return refreshToken
}

export async function getUser(identifier: string, type: 'google' | 'github'): Promise<User | null> {
  const users = await cookieDB.select("users", `eq($${type}, '${identifier}')`);
  if (users.length > 0) {
    return users[0] as User;
  }
  return null;
}

export function updateUserOauth(key: string, identifier: string, type: 'google' | 'github') {
  return cookieDB.update("users", key, {
    [type]: identifier,
  });
}

/**
 * @param key 
 * @returns refreshToken
 */
export async function updateUserRefreshToken(key: string) {
  const refreshToken = await create({
    alg: "HS512",
    typ: "JWT",
  }, {exp: getNumericDate(4 * 60 * 60)}, "secret");
  await cookieDB.update("users", key, {
    refreshToken,
  });
  return refreshToken;
}