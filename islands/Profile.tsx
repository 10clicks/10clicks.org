// import DailyUseChart from '../components/DailyUseChart.tsx'
import Streak from '../components/Streak.tsx'

export default function Profile() {
  console.log("here");
  localStorage.setItem("test", "test")
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
      </div>
      <div className='col-span-2 flex flex-col py-16 lg:px-8 px-4 lg:border-r lg:border-l-0 border-x border-black'>
        <p className='ml-6 text-lg'>
          Public Data
        </p>
        <img
          src="/DailyUseChart"
          class="mx-auto my-4 lg:h-96"
          alt="an example chart provided as an image"
        />
      </div>
    </div>
  )
}