import ChecklistItem from "./ChecklistItem.tsx"
import useConfettiCheck from "../components/hooks/useConfettiCheck.ts";
import Spinner from "../components/Spinner.tsx";

import { useEffect, useState } from "preact/hooks";
const data = [
  {
    name: "Sleep",
    description: "Did you sleep well last night? The average adult requires 7-9 hours."
  },
  {
    name: "Food",
    description: "Eat what makes you feel good. Minimum of 2 real meals and 1 snack. "
  },
  {
    name: "Workout",
    description: "Exercise, either cardio or weightlifting. At least 30 minutes, high intensity."
  },
  {
    name: "Clean",
    description: "A neat room leads to a calm mind. Tidy up a bit."
  },
  {
    name: "Socialize",
    description: "Call a friend, parent or sibling. Tell them you love them."
  },
  {
    name: "Dulce",
    description: "Make a random someone’s day. Compliment a stranger. Do at least 1 kind thing."
  },
  {
    name: "Hobby",
    description: "Practice a hobby. Guitar, knitting, music production, anything! At least 30 minutes."
  },
  {
    name: "Goal",
    description: "Work towards a long term goal. At least 30 minutes."
  },
  {
    name: "Read",
    description: "Grab a book, genre doesn’t matter. Read through 10 pages."
  },
  {
    name: "Journal",
    description: "What's the highlight of your day? What's upsetting you? Journal at least 1 page."
  },
]

let clickRequestTimeout: any = null;
let currentClickTypes: string[] = []

let unclickRequestTimeout: any = null;
let currentUnclickTypes: string[] = []

export default function ChecklistDescription(props: {
  refreshToken: string
}) {
  const {numberClicked, setNumberClicked} = useConfettiCheck();
  const [ clickData, setClickData ] = useState<any>(null);


  useEffect(() => {
    // fetch user data
    console.log("fetching click data");
    fetch('/api/clickData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        res.json().then((data) => {
          for (const key of Object.keys(data)) {
            // uppercase first letter
            const id = key.charAt(0).toUpperCase() + key.slice(1);
            window.localStorage.setItem(id, JSON.stringify(data[key]));
            window.localStorage.setItem(id + "Date",  JSON.stringify(new Date().getTime()));
          }
          setClickData(data);
        })
      } else {
        setClickData({});
      }
    });
  }, [props.refreshToken]);

  function sendClickRequest(type: string) {
    if (!props.refreshToken) return;
    if (clickRequestTimeout) {
      currentClickTypes.push(type);
      return;
    }
    currentClickTypes.push(type);
    clickRequestTimeout = setTimeout(() => {
      fetch('/api/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: props.refreshToken,
          types: currentClickTypes
        })
      });
      currentClickTypes = [];
      clickRequestTimeout = null;
    }, 500);
  }

  function sendUnclickRequest(type: string) {
    if (!props.refreshToken) return;
    if (unclickRequestTimeout) {
      currentUnclickTypes.push(type);
      return;
    }
    currentUnclickTypes.push(type);
    unclickRequestTimeout = setTimeout(() => {
      fetch('/api/unclick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: props.refreshToken,
          types: currentUnclickTypes
        })
      });
      currentUnclickTypes = [];
      unclickRequestTimeout = null;
    }, 500);
  }
  return (
    <div className="lg:w-2/3 p-4 mx-auto mt-8 h-full flex flex-col h-full flex-grow">
      <div className="flex lg:flex-row flex-col gap-4 items-center">
        <h1 className="font-normal text-2xl">Checklist</h1>
        <p style={
          {
            color: "#555555"
          }
        } className="font-normal text-base">List is loosely ordered but should attempt to be followed in sequence. </p>
      </div>
      <div className="flex flex-col gap-4 mt-4 items-center h-full">
        {clickData !== null ? 
          data.map((item, i) => {
            return (
              <ChecklistItem 
                name={item.name} 
                description={item.description} 
                setNumberClicked={setNumberClicked} 
                index={i} 
                sendClickRequest={sendClickRequest}
                sendUnclickRequest={sendUnclickRequest}
              />
            )
          }) : 
          (
            <div className="h-40 flex flex-row items-center justify-center">
              <Spinner 
                size={16}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}