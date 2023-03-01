export interface DailyData {
  data: [number, number, number, number, number, number, number, number, number, number];
}

export interface TotalClicks {
  data: [number, number, number, number, number, number, number];
}

// array of 30 numbers
export interface Past30DaysUserData {
  data: [
    number, number, number, number, number, number,
    number, number, number, number, number, number,
    number, number, number, number, number, number,
    number, number, number, number, number, number,
    number, number, number, number, number, number
  ]
}