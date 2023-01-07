import { useEffect, useState } from 'preact/hooks';
import confetti from "https://esm.sh/canvas-confetti@1.6.0"

export default function useConfettiCheck() {
  const [numberClicked, setNumberClicked] = useState(0);
  useEffect(() => {
    if (numberClicked === 10) {
      // show big confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 }
      });
    }
  }, [numberClicked]);
  return {numberClicked, setNumberClicked};
}