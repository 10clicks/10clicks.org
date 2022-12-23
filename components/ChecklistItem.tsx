interface ChecklistItemProps {
  name: string;
  description: string;
}
export default function ChecklistItem(props: ChecklistItemProps) {
  return (
    <div className="w-full lg:h-8 h-20 rounded-l-full flex flex-row items-center gap-3" style={
      {
        background: "#DDDDDD",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }
    }>
      <div className="font-extralight bg-white rounded-full lg:h-8 lg:w-8 h-20 w-20 flex-shrink-0"/>
      <h2 className="font-extralight w-16 flex-shrink-0">{props.name}</h2>
      <p style={
        {
          color: "#888888"
        }
      } className="font-extralight lg:text-base text-sm">{props.description}</p>
    </div>
  )
}
