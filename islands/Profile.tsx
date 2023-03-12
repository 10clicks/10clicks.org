// import DailyUseChart from '../components/DailyUseChart.tsx'
import Streak from '../components/Streak.tsx'
import { DailyData, TotalClicks, Past10DaysUserData, User } from '../components/types/types.ts';
import { useState } from 'preact/hooks'
import Signup from './Signup.tsx'
import { useFetchUserData } from '../components/hooks/useFetchUserData.ts';

export interface IProps {
  refreshToken: string | null;
  profileName: string | null;
  profilePicture: string | null;
}

function extra10DaysData(userData: User) {
  const ret: Past10DaysUserData = {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  for (let i = 0; i <= 9; i++) {
    ret.data[i] = userData.last10DaysClicks[(9 - i).toString() as keyof User['last10DaysClicks']] as number;
  }
  return ret;
}

export default function Profile(props: IProps) {
  const { userData, setUserData } = useFetchUserData(props.refreshToken as string);
  const [dailyData, setDailyData] = useState<DailyData>({
    data: [10, 9, 6, 8, 7, 9, 10, 3, 4, 5]
  });
  const [totalClicks, setTotalClicks] = useState<TotalClicks>({
    data: [
      10, 19, 25, 33, 40, 49, 59,
    ]
  });

  function signout() {
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

  if (!props.refreshToken) {
    return (
      <div className='flex-grow flex flex-row items-center justify-center'>
        <Signup/>
      </div>
    )
  }
  return (
    <div className='w-4/5 lg:grid-cols-3 lg:grid flex flex-col mx-auto flex-grow'>
      <div className='col-span-1 flex flex-col items-center border-x border-black lg:py-16 py-4 px-8 relative'>
        <button className='absolute top-2 left-2 border-b border-black' onClick={signout}>
          Sign Out
        </button>
        <p className='ml-6 text-lg w-full pb-4 pt-4 lg:pt-0'>
          Your Data
        </p>
        <img className='w-36 h-36 rounded-full border border-black' src={props.profilePicture as string}>
        </img>
        <p className='my-4'>
          {props.profileName}
        </p> 
        <div className='border-dashed border-t border-black w-full'/>
        {
          userData && (
            <Streak 
              total = {userData.streak ? userData.streak : 0}
              daily={[1, 1, 1, 0, 0, 1, 1]}
            />
          )
        }
        <div className='border-dashed border-t border-black w-full mt-4'/>
        {
          userData && (
            <p className='w-full mt-4'>
              Total clicks: {userData.totalClicks}
            </p>
          )
        }
        <div className='border-dashed border-t border-black w-full mt-4'/>
        <p className='mt-6'>
          Your Clicks for Last 10 Days
        </p>
        {
          userData && (
            <img
              src={`/Past10DaysUserDataChart?data=${extra10DaysData(userData).data.join(',')}`}
              class="mx-auto my-4"
              alt="Your Clicks for Last 30 Days"
            />
          )
        }
        
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