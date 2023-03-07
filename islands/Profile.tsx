// import DailyUseChart from '../components/DailyUseChart.tsx'
import Streak from '../components/Streak.tsx'
import { DailyData, TotalClicks, Past30DaysUserData } from '../components/types/types.ts';
import { useState } from 'preact/hooks'
import Signup from './Signup.tsx'

import useLocalStorage from '../components/hooks/useLocalStorage.ts';
export default function Profile() {
  const [dailyData, setDailyData] = useState<DailyData>({
    data: [10, 9, 9, 5, 3, 2, 1, 0, 0, 0]
  });

  const [totalClicks, setTotalClicks] = useState<TotalClicks>({
    data: [10, 40, 30, 40, 20, 10, 3]
  });

  const [past30DaysUserData, setPast30DayUserData] = useState<Past30DaysUserData>({
    data: [10, 40, 30, 40, 20, 10, 3, 10, 40, 30, 40, 20, 10, 3, 10, 40, 30, 40, 20, 10, 3, 10, 40, 30, 40, 20, 10, 3, 10, 40]
  });

  const {
    storedValue: token,
    setStoredValue: setToken
  }= useLocalStorage('', 'token');

  if (!token) {
    return (
      <div className='flex-grow flex flex-row items-center justify-center'>
        <Signup/>
      </div>
    )
  }
  return (
    <div className='w-4/5 lg:grid-cols-3 lg:grid flex flex-col mx-auto flex-grow'>
      <div className='col-span-1 flex flex-col items-center border-x border-black lg:py-16 py-4 px-8'>
        <p className='ml-6 text-lg w-full pb-4'>
          Your Data
        </p>
        <img className='w-36 h-36 rounded-full border border-black' src='http://www.gravatar.com/avatar/?d=identicon'>
        </img>
        <p className='my-4'>
          TestUsername
        </p> 
        <div className='border-dashed border-t border-black w-full'/>
        <Streak 
          total = {40} 
          daily={[1, 1, 1, 0, 0, 1, 1]}
        />
        <div className='border-dashed border-t border-black w-full mt-4'/>
        <p className='w-full mt-4'>
          Total clicks: 40
        </p>
        <div className='border-dashed border-t border-black w-full mt-4'/>
        <p className='mt-6'>
          Your Clicks for Last 30 Days
        </p>
        <img
          src={`/Past30DaysUserDataChart?data=${past30DaysUserData.data.join(',')}`}
          class="mx-auto my-4"
          alt="Your Clicks for Last 30 Days"
        />
      </div>
      <div className='col-span-2 flex flex-col py-16 lg:px-8 px-4 lg:border-r lg:border-l-0 border-x border-black'>
        <p className='ml-6 text-lg'>
          Public Data
        </p>
        <p className='text-sm mx-auto pt-4'>
          Daily Total Use (All Users)
        </p>
        <img
          src={`/DailyUseChart?data=${dailyData.data.join(',')}`}
          class="mx-auto my-4 lg:h-96"
          alt="Overall Daily Use for All Users"
        />
        <p className='text-sm mx-auto pt-2'>
          Weekly Total Clicks (All Users)
        </p>
        <img
          src={`/TotalUseChart?data=${totalClicks.data.join(',')}`}
          class="mx-auto my-4 lg:h-96"
          alt="Overall Weekly Use for All Users"
        />
      </div>
    </div>
  )
}