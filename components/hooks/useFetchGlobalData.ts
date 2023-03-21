import { useEffect, useState } from 'preact/hooks';
import { GlobalData } from '../types/types.ts';

export function useFetchGlobalData(refreshToken: string) {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const response = await fetch('/api/globalClickData');
      const data = await response.json();
      setGlobalData(data);
    };
    if (refreshToken) {
      fetchGlobalData();
    }
  }, [refreshToken]);

  return { globalData, setGlobalData };
}