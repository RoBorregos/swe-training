import React from "react";

export const BurningButton = () => {
  return (
    <div className="relative flex h-screen items-center justify-center bg-[--bg] text-[--fg]">
      <button
        type="button"
        className="relative h-[2.5em] w-[2.5em] appearance-none rounded-[1.25em] font-bold text-white filter transition-transform duration-100 [filter:url(#fire)] hover:translate-y-[0.1em] focus:translate-y-[0.1em]"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`btn__p pointer-events-none absolute h-[0.5em] w-[0.5em] rounded-full bg-[#f42f25] p${i + 1}`}
            style={{
              "--x": `${Math.random() * 40 - 20}px`,
              "--y": `${Math.random() * -40}px`,
              animationDelay: `${Math.random() * 1}s`,
            }}
          />
        ))}
        <span className="btn__text absolute left-0 top-0 z-[1] h-full w-full rounded-full bg-[#f42f25] p-[0.5em]">
          !
        </span>
      </button>

      <svg
        className="absolute left-0 top-0 h-0 w-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="fire">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="fire"
            />
            <feBlend in="SourceGraphic" in2="fire" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
