import { StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import useLocalStorage from "../components/hooks/useLocalStorage.ts";

interface ChecklistItemProps {
  name: string;
  description: string;
  setNumberClicked: StateUpdater<number>;
  index: number;
  sendClickRequest: (type: string) => void;
  sendUnclickRequest: (type: string) => void;
}
export default function ChecklistItem(props: ChecklistItemProps) {
  const checklistButton = useRef<HTMLAnchorElement>(null);
  // props.refresh is a hack to force a rerender when data is initially loaded
  const {storedValue: isClicked, setStoredValue:setIsClicked} = useLocalStorage(false, props.name);

  useEffect(() => {
    if (isClicked) {
      makeItemGreen();
    } else {
      makeItemRed();
    }
  }, [isClicked]);

  function turnOnChecklistItem() {
    // return the scale of the button back to 1
    if (!checklistButton.current) return;
    if (!isClicked) {
      setIsClicked(true);
      props.setNumberClicked(e => e + 1);
      props.sendClickRequest(props.name.toLowerCase());
    } else {
      setIsClicked(false);
      props.setNumberClicked(e => e - 1);
      props.sendUnclickRequest(props.name.toLowerCase());
    }
  }

  function makeItemGreen() {
    if (!checklistButton.current) return;
    if ((checklistButton.current.children[0] as HTMLDivElement).style.background == "#1DB954") return;
    checklistButton.current.style.transform = "scale(1)";
    // shake the button
    checklistButton.current.animate([
      { transform: "translateX(0px)", rotate: "0deg" },
      { transform: "translateX(3px)", rotate: "0.4deg" },
      { transform: "translateX(-3px)", rotate: "-0.15deg" },
      { transform: "translateX(3px)", rotate: "0.08deg" },
      { transform: "translateX(-3px)", rotate: "-0deg" },
    ], {
      duration: 300,
      iterations: 1
    });
    // make the div inside the button green
    (checklistButton.current.children[0] as HTMLDivElement).style.background = "#1DB954";
  }

  function makeItemRed() {
    if (!checklistButton.current) return;
    if ((checklistButton.current.children[0] as HTMLDivElement).style.background == "#FFFFFF") return;
    checklistButton.current.style.transform = "";
    (checklistButton.current.children[0] as HTMLDivElement).style.background = "#FFFFFF";
  }

  useEffect(() => {
    if (isClicked) {
      makeItemGreen();
      props.setNumberClicked(e => e + 1);
    } else {
      makeItemRed();
    }
  }, []);

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
      <div className="font-normal bg-white rounded-full lg:h-8 lg:w-8 h-20 w-20 flex-shrink-0"/>
      <h2 className="font-normal w-16 flex-shrink-0 text-left">{props.name}</h2>
      <p style={
        {
          color: "#555555"
        }
      } className="font-normal lg:text-base text-sm">{props.description}</p>
    </a>
  )
}
