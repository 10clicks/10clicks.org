interface IProps {
  total: number,
  daily: number[]
}
export default function Streak(
  props: IProps
) {
  return (
    <div className="mt-4 w-full">
      <p>
        Streak: {props.total}
      </p>
      <p className="text-sm text-gray-600 pb-2">
        A day is considered completed if you complete all 10 clicks
      </p>
      <p className="pt-1 text-sm pb-2">
        Sun - - - - - - - - --&gt; Sat
      </p>
      <div className="border border-dashed border-black flex flex-row w-40 justify-between items-center p-2">
        {
          props.daily.map((day, index) => {
            return (
              <div className={`h-4 w-4 ${day ? "bg-green-500" : "bg-red-500"} rounded-full inline-block`}>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}