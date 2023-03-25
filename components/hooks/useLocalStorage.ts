import { useEffect, useState } from "preact/hooks";
export default function useLocalStorage<Type>(initialValue: Type, key: string) {
  const [storedValue, setStoredValue] = useState<Type>(() => {
    try {
      let item = window.localStorage.getItem(key);
      // if the date is yesterday, clear the item
      const date = parseInt(window.localStorage.getItem(key + "Date") as string, 10);
      if (date) {
        const dateObj = new Date(date);
        const today = new Date();
        if (dateObj.getUTCDate() !== today.getUTCDate()) {
          window.localStorage.removeItem(key);
          window.localStorage.removeItem(key + "Date");
          item = null;
        }
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      // save the date stored
      window.localStorage.setItem(key + "Date", JSON.stringify(new Date().getTime()));
    } catch (error) {
      console.log(error);
    }
  }, [storedValue]);

  useEffect(() => {
    // set the value to the local storage value if it exists
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [initialValue]);

  return {storedValue, setStoredValue};
  
}