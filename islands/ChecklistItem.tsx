import { useRef, useState } from "preact/hooks";
interface ChecklistItemProps {
  name: string;
  description: string;
}
export default function ChecklistItem(props: ChecklistItemProps) {
  const checklistButton = useRef<HTMLAnchorElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  function turnOnChecklistItem() {
    // return the scale of the button back to 1
    if (!checklistButton.current) return;
    setIsClicked(true);
    checklistButton.current.style.transform = "scale(1)";
    // shake the button
    checklistButton.current.animate([
      { transform: "translateX(0px)", rotate: "0deg" },
      { transform: "translateX(3px)", rotate: "0.2deg" },
      { transform: "translateX(-3px)", rotate: "-0.2deg" },
      { transform: "translateX(3px)", rotate: "0.2deg" },
      { transform: "translateX(-3px)", rotate: "-0.2deg" },
      { transform: "translateX(3px)", rotate: "0.2deg" },
      { transform: "translateX(-3px)", rotate: "-0.2deg" },
      { transform: "translateX(0px)", rotate: "0deg" },
    ], {
      duration: 500,
      iterations: 1
    });
    // make the div inside the button green
    (checklistButton.current.children[0] as HTMLDivElement).style.background = "#26A65B";

  }

  return (
    <a className={"w-full lg:h-8 h-20 rounded-l-full flex flex-row items-center gap-3" + " checklistButton"} style={
        {
          background: "#DDDDDD",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          cursor: "pointer"
        }
      }
      onClick={turnOnChecklistItem}
      aria-role="button"
      ref={checklistButton}
    >
      <div className="font-light bg-white rounded-full lg:h-8 lg:w-8 h-20 w-20 flex-shrink-0"/>
      <h2 className="font-light w-16 flex-shrink-0 text-left">{props.name}</h2>
      <p style={
        {
          color: "#888888"
        }
      } className="font-light lg:text-base text-sm">{props.description}</p>
    </a>
  )
}
