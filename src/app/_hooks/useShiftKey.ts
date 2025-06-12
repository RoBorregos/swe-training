import { useEffect, useState } from "react";

export default function useToggleShiftKey() {
  const [shiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        setShiftPressed((shiftPressed) => !shiftPressed);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  return shiftPressed;
}
