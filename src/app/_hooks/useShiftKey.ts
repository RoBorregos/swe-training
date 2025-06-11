import { useEffect, useState } from "react";

export default function useShiftKey() {
  const [shiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setShiftPressed(e.shiftKey);
    };

    const onBlur = () => {
      setShiftPressed(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return shiftPressed;
}
