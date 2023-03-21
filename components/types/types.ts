export interface DailyData {
  data: [number, number, number, number, number, number, number, number, number, number];
}

export interface TotalClicks {
  data: [number, number, number, number, number, number, number];
}

// array of 30 numbers
export interface Past10DaysUserData {
  data: [
    number, number, number, number, number, number,
    number, number, number, number
  ]
}

export interface User {
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
}

export interface GlobalData {
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