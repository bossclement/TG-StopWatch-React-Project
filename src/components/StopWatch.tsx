import { useEffect, useRef, useState } from "react";

export default function StopWatch() {
  const pauseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  );
  const playIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
  const [timer, setTimer] = useState<number>(0);
  const [isPause, setPause] = useState<boolean>(true);
  const startTimeRef = useRef<number>(0);
  const rafId = useRef<number>(0);

  // calculated the ellapsed time
  const tick = () => {
    const elapsed = performance.now() - startTimeRef.current + timer;
    setTimer(elapsed);
    rafId.current = requestAnimationFrame(tick);
  };

  const reset = function () {
    startTimeRef.current = 0;
    setTimer(0);
  };

  // start the the timer
  useEffect(() => {
    if (!isPause) {
      startTimeRef.current = performance.now();
      rafId.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPause]);

  const formatTimer = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${String(seconds).padStart(2, "0")}.${String(
      centiseconds
    ).padStart(2, "0")}`;
  };

  return (
    <main
      className={
        "w-[40%] mx-auto border border-[#ccc] rounded-[5px] flex flex-col items-center text-white " +
        (isPause ? "bg-[#353028]" : "bg-[#2c303d]")
      }
    >
      <div>
        <p className="font-bold text-[60px] font-mono">{formatTimer(timer)}</p>
      </div>
      <div>
        <button className="" onClick={() => setPause((prev) => !prev)}>
          {isPause ? pauseIcon : playIcon}
        </button>
        <button onClick={reset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
