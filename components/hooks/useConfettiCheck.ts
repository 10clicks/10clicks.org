import { useEffect, useState } from 'preact/hooks';
import confetti from "https://esm.sh/canvas-confetti@1.6.0"

export default function useConfettiCheck() {
  const [numberClicked, setNumberClicked] = useState(0);
  useEffect(() => {
    if (numberClicked === 10) {
      // show big confetti with multiple bursts
      confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.6}
      });
    }
  }, [numberClicked]);
  return {numberClicked, setNumberClicked};
}