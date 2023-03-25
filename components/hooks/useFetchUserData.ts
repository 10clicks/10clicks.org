import { useEffect, useState } from 'preact/hooks';
import { User } from '../types/types.ts';

export function useFetchUserData(refreshToken: string) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        // Sign user out 
        fetch('/api/signout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 200) {
            window.location.href = '/profile';
          }
        });
      }
    };
    if (refreshToken) {
      fetchUserData();
    }
  }, [refreshToken]);

  return { userData, setUserData };
}