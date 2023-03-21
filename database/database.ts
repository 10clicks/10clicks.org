import { CookieDB } from "cookiedb";
import { create, getNumericDate } from "djwt";

interface User {
  "refreshToken": string | null;
  "google": string | null;
  "github": string | null;
  "totalClicks": number | null;
  "lastTimeClicked": number | null;
  "lastTimeCompleted": number | null;
  "streak": number | null;
  "last10DaysClicks": {
    "0": number | null
    "1": number | null
    "2": number | null
    "3": number | null
    "4": number | null
    "5": number | null
    "6": number | null
    "7": number | null
    "8": number | null
    "9": number | null
  };
  "todaysClicks": {
    "sleep": boolean | null;
    "food": boolean | null;
    "workout": boolean | null;
    "clean": boolean | null;
    "socialize": boolean | null;
    "dulce": boolean | null;
    "hobby": boolean | null;
    "goal": boolean | null;
    "read": boolean | null;
    "journal": boolean | null;
  };
  "key": string;
}

interface GlobalData {
  "lastTimeClickProccessed": number,
  "dailyTotalUse": {
    "sleep": number,
    "food": number,
    "workout": number,
    "clean": number,
    "socialize": number,
    "dulce": number,
    "hobby": number,
    "goal": number,
    "read": number,
    "journal": number
  },
  "last7DaysUse": {
    "0": number,
    "1": number,
    "2": number,
    "3": number,
    "4": number,
    "5": number,
    "6": number
  },
  "key": string
}


const userKeys = {
  "refreshToken": null,
  "google": null,
  "github": null,
  "totalClicks": 0,
  "lastTimeClicked": 0,
  "lastTimeCompleted": 0,
  "streak": 0,
  "last10DaysClicks": {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
  },
  "todaysClicks": {
    "sleep": false,
    "food": false,
    "workout": false,
    "clean": false,
    "socialize": false,
    "dulce": false,
    "hobby": false,
    "goal": false,
    "read": false,
    "journal": false
  }
}

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
  };

  for (const key of Object.keys(userKeys)) {
    if (payload[key] === undefined) {
      payload[key] = userKeys[key as keyof typeof userKeys];
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

export async function getUserByToken(refreshToken: string) {
  const users = await cookieDB.select("users", `eq($refreshToken, '${refreshToken}')`);
  if (users.length > 0) {
    return users[0] as User;
  }
  return null;
}

function daysBetween(startDate: Date, endDate: Date) {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

export async function processClicks(refreshToken: string, types: string[]) {
  const user = await getUserByToken(refreshToken);
  if (!user) return null;
  const updates = {
    totalClicks: user?.totalClicks,
    todaysClicks: user?.todaysClicks as any,
    streak: user?.streak as number,
    lastTimeClicked: Date.now(),
    lastTimeCompleted: user?.lastTimeCompleted as number,
    last10DaysClicks: user?.last10DaysClicks as any,
  };
  if (!updates.totalClicks) updates.totalClicks = 0;
  let numberClicked = 0;
  for (const type of types) {
    if (updates.todaysClicks[type] === false) {
      updates.todaysClicks[type] = true;
      updates.totalClicks++;
      numberClicked++;
    }
  }

  const lastTimeCompleted = user?.lastTimeCompleted as number;
  const lastTimeCompletedDate = new Date(lastTimeCompleted);
  const today = new Date();
  const lastTimeClicked = user?.lastTimeClicked as number;
  const lastTimeClickedDate = new Date(lastTimeClicked);
  if (lastTimeClickedDate.getDate() !== today.getDate()) {
    // update last10DaysClicks
    // move back by x number of days which is the number of 24 hour periods from now
    const daysToMoveBack = daysBetween(lastTimeClickedDate, today);
    for (let i = 9; i >= 0; i--) {
      if (i + daysToMoveBack <= 9) {
        updates.last10DaysClicks[i + daysToMoveBack] = updates.last10DaysClicks[i];
      } else {
        updates.last10DaysClicks[i] = 0;
      }
    }
    updates.last10DaysClicks[0] = numberClicked;
  } else {
    updates.last10DaysClicks[0] = user?.last10DaysClicks[0] as number + numberClicked;
  }
  updates.lastTimeClicked = Date.now();
  if (lastTimeCompletedDate.getDate() !== today.getDate()) {
    // check if the dates are a day apart
    if (daysBetween(lastTimeCompletedDate, today) > 1) {
      updates.streak = 0;
    } else {
      updates.streak = user?.streak as number + 1;
    }
    // check if all 10 items were clicked
    let allClicked = true;
    for (const key of Object.keys(updates.todaysClicks)) {
      if (!updates.todaysClicks[key]) {
        allClicked = false;
        break;
      }
    }
    if (allClicked) {
      updates.streak = updates?.streak as number + 1;
      updates.lastTimeCompleted = Date.now();
    }
  }
  await cookieDB.update("users", user.key, updates);
  return clickUpdateGlobalClickData(types);
}

export async function processUnclicks(refreshToken: string, types: string[]) {
  const user = await getUserByToken(refreshToken);
  if (!user) return null;
  const updates = {
    totalClicks: user?.totalClicks as number,
    todaysClicks: user?.todaysClicks as any,
    last10DaysClicks: user?.last10DaysClicks as any,
  }
  for (const type of types) {
    if (user.todaysClicks[type as keyof User['todaysClicks']]) {
      updates.todaysClicks[type] = false;
      updates.last10DaysClicks[0] = updates?.last10DaysClicks[0] as number - 1;
      updates.totalClicks--;
    }
  }
  await cookieDB.update("users", user.key, updates);
  return unclickUpdateGlobalClickData(types);
}

export async function getClickData(refreshToken: string) {
  const user = await getUserByToken(refreshToken);
  if (!user) return null;
  const lastTimeClicked = user?.lastTimeClicked as number;
  const lastTimeClickedDate = new Date(lastTimeClicked);
  const today = new Date();
  if (lastTimeClickedDate.getDate() !== today.getDate()) {
    // clear todaysClicks
    const updates = {
      todaysClicks: user?.todaysClicks as any,
    }
    for (const key of Object.keys(updates.todaysClicks)) {
      updates.todaysClicks[key] = false;
    }
    await cookieDB.update("users", user.key, updates);
  }

  return user.todaysClicks;
}
  
export async function clickUpdateGlobalClickData(type: string[]) {
  const globalDataArr = await cookieDB.select("global", "") as GlobalData[];
  const globalData = globalDataArr[0];
  const lastTimeClickProccessed = globalData.lastTimeClickProccessed;
  const lastTimeClickProccessedDate = new Date(lastTimeClickProccessed);
  const today = new Date();
  let updates = {
    dailyTotalUse: globalData.dailyTotalUse as any,
    last7DaysUse: globalData.last7DaysUse as any,
    lastTimeClickProccessed: Date.now(),
  }
  if (lastTimeClickProccessedDate.getDate() !== today.getDate()) {
    // clear dailyTotalUse
    updates.dailyTotalUse = globalData.dailyTotalUse as any;
    for (const key of Object.keys(updates.dailyTotalUse)) {
      updates.dailyTotalUse[key] = 0;
    }
    // move back last7DaysUse by date difference
    const daysToMoveBack = daysBetween(lastTimeClickProccessedDate, today);
    for (let i = 6; i >= 0; i--) {
      if (i + daysToMoveBack <= 6) {
        updates.last7DaysUse[i + daysToMoveBack] = updates.last7DaysUse[i];
      } else {
        updates.last7DaysUse[i] = 0;
      }
    }
    updates.last7DaysUse[0] = 0;
  }
  for (const t of type) {
    updates.dailyTotalUse[t] = updates.dailyTotalUse[t] as number + 1;
  }
  updates.last7DaysUse["0"] = updates.last7DaysUse["0"] as number + type.length;
  await cookieDB.update("global", globalData.key, updates);
}

export async function unclickUpdateGlobalClickData(type: string[]) {
  const globalDataArr = await cookieDB.select("global", "") as GlobalData[];
  const globalData = globalDataArr[0];
  const updates = {
    dailyTotalUse: globalData.dailyTotalUse as any,
    last7DaysUse: globalData.last7DaysUse as any,
  }
  for (const t of type) {
    updates.dailyTotalUse[t] = updates.dailyTotalUse[t] as number - 1;
  }
  updates.last7DaysUse["0"] = updates.last7DaysUse["0"] as number - type.length;
  await cookieDB.update("global", globalData.key, updates);
}

export async function getGlobalClickData() {
  const globalDataArr = await cookieDB.select("global", "") as GlobalData[];
  const globalData = globalDataArr[0];
  const lastTimeClickProccessed = globalData.lastTimeClickProccessed;
  const lastTimeClickProccessedDate = new Date(lastTimeClickProccessed);
  const today = new Date();
  if (lastTimeClickProccessedDate.getDate() !== today.getDate()) {
    // clear dailyTotalUse
    const updates = {
      dailyTotalUse: globalData.dailyTotalUse as any,
    }
    for (const key of Object.keys(updates.dailyTotalUse)) {
      updates.dailyTotalUse[key] = 0;
    }
    await cookieDB.update("global", globalData.key, updates);
  }
  return globalData;
}