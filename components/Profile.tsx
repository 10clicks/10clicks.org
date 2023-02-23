import DailyUseChart from './DailyUseChart.tsx'
import Streak from './Streak.tsx'

export default function Profile() {
  return (
    <div className='w-4/5 grid grid-cols-3 mx-auto'>
      <div className='col-span-1 flex flex-col items-center border-x border-black py-16 px-8'>
        <p className='ml-6 text-lg w-full pb-4'>
          Your Data
        </p>
        <img className='w-36 h-36 rounded-full border border-black' src='http://www.gravatar.com/avatar/?d=identicon'>
        </img>
        <p className='my-4 font-semibold'>
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
      </div>
      <div className='col-span-2 flex flex-col py-16 px-8 border-r border-black'>
        <p className='ml-6 text-lg'>
          Public Data
        </p>
        <DailyUseChart/>
        <DailyUseChart/>
      </div>
    </div>
  )
}