import { useEffect, useState } from 'preact/hooks';
import { User } from '../types/types.ts';

export function useFetchUserData(refreshToken: string) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setUserData(data);
    };
    if (refreshToken) {
      fetchUserData();
    }
  }, [refreshToken]);

  return { userData, setUserData };
}