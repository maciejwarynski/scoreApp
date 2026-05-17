import { useSettings } from "../../store/settingsStore";
import { useEffect, useRef, useState } from "react";
import { rules } from "../../rules/rules";
import { saveState, loadState } from "../../store/localstorageStore";

type Fighter = "aka" | "ao";

type PenaltiesState = {
  aka: Record<string, number>;
  ao: Record<string, number>;
};

function KumiteComponent() {
  const { akaName, aoName, category, minutes, seconds } = useSettings();

  const rule = category ? rules[category] : null;

  const [akaPoints, setAkaPoints] = useState(0);
  const [aoPoints, setAoPoints] = useState(0);

  const [penalties, setPenalties] = useState({
    aka: {
      atenai: 0,
      jogai: 0,
      mubobi: 0,
      chukoku: 0,
    },
    ao: {
      atenai: 0,
      jogai: 0,
      mubobi: 0,
      chukoku: 0,
    },
  });

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = loadState();
    if (!saved) return;

    setAkaPoints(saved.akaPoints ?? 0);
    setAoPoints(saved.aoPoints ?? 0);
    setPenalties(saved.penalties ?? { aka: {}, ao: {} });
    setTimeLeft(saved.timeLeft ?? 0);
    setIsRunning(saved.isRunning ?? false);
  }, []);

  useEffect(() => {
    saveState({
      akaName,
      aoName,
      akaPoints,
      aoPoints,
      penalties,
      timeLeft,
      isRunning,
      category,
    });
  }, [
    akaName,
    aoName,
    akaPoints,
    aoPoints,
    penalties,
    timeLeft,
    isRunning,
    category,
  ]);

  const openWindow = () => {
    window.open("/display", "kumite-display", "width=1920,height=1080");
  };

  const sync = (nextState: any) => {
    saveState(nextState);
  };

  // INIT TIMER FROM SETTINGS
  useEffect(() => {
    const min = Number(minutes) || 0;
    const sec = Number(seconds) || 0;
    setTimeLeft(min * 60 + sec);
  }, [minutes, seconds]);

  // TIMER LOGIC
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  if (!rule) {
    return (
      <div className="text-white text-center mt-10">
        Wybierz kategorię w Settings
      </div>
    );
  }

  const penaltyList = Object.keys(rule.penalties);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsRunning((p) => !p);

  const handleAkaPlus = () => setAkaPoints((p) => p + 1);
  const handleAkaMinus = () => setAkaPoints((p) => Math.max(0, p - 1));

  const handleAoPlus = () => setAoPoints((p) => p + 1);
  const handleAoMinus = () => setAoPoints((p) => Math.max(0, p - 1));

  const addPenalty = (fighter: Fighter, type: string) => {
    const max = rule.penalties[type as keyof typeof rule.penalties];

    setPenalties((prev) => {
      const current = prev[fighter][type] ?? 0;
      if (current >= max) return prev;

      return {
        ...prev,
        [fighter]: {
          ...prev[fighter],
          [type]: current + 1,
        },
      };
    });
  };

  const removePenalty = (fighter: Fighter, type: string) => {
    setPenalties((prev) => {
      const current = prev[fighter][type] ?? 0;
      if (current <= 0) return prev;

      return {
        ...prev,
        [fighter]: {
          ...prev[fighter],
          [type]: current - 1,
        },
      };
    });
  };

  // 🔥 RESET ALL
  const handleReset = () => {
    setAkaPoints(0);
    setAoPoints(0);

    setPenalties({
      aka: {},
      ao: {},
    });

    const min = Number(minutes) || 0;
    const sec = Number(seconds) || 0;

    setTimeLeft(min * 60 + sec);
    setIsRunning(false);

    saveState({
      akaPoints: 0,
      aoPoints: 0,
      penalties: { aka: {}, ao: {} },
      timeLeft: min * 60 + sec,
      isRunning: false,
    });
  };

  return (
    <section className="flex flex-col font-roboto text-white">
      {/* HEADER */}
      <div className="flex justify-between p-4 text-4xl font-bold">
        <div className="bg-red-600 w-1/2 text-start p-2">{akaName}</div>
        <div
          className={` w-1/2 text-end p-2  ${
            category === "IPPON"
              ? "bg-slate-50 text-black"
              : "bg-sky-600 text-slate-50"
          }`}
        >
          {aoName}
        </div>
      </div>

      {/* SCORE */}
      <div className="flex justify-around p-10 font-bold">
        <div className="flex gap-6 items-center">
          <button
            onClick={handleAkaPlus}
            className="bg-red-600 w-12 h-12 rounded-full hover:cursor-pointer"
          >
            +
          </button>

          <div className="text-[clamp(1rem,20vw,24rem)] text-red-600">
            {akaPoints}
          </div>

          <button
            onClick={handleAkaMinus}
            className="bg-red-600 w-12 h-12 rounded-full hover:cursor-pointer"
          >
            -
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-amber-400 text-[clamp(1rem,6vw,16rem)]">
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={toggleTimer}
            className="bg-sky-600 px-4 py-1 rounded hover:cursor-pointer"
          >
            {isRunning ? "STOP" : "START"}
          </button>
        </div>

        <div className="flex gap-6 items-center">
          <button
            onClick={handleAoPlus}
            className={` w-12 h-12 rounded-full hover:cursor-pointer ${
              category === "IPPON"
                ? "bg-slate-50 text-black"
                : "bg-sky-600 text-slate-50"
            }`}
          >
            +
          </button>

          <div
            className={`text-[clamp(1rem,20vw,24rem)] ${
              category === "IPPON" ? "text-slate-50" : "text-sky-600"
            }`}
          >
            {aoPoints}
          </div>

          <button
            onClick={handleAoMinus}
            className={` w-12 h-12 rounded-full hover:cursor-pointer ${
              category === "IPPON"
                ? "bg-slate-50 text-black"
                : "bg-sky-600 text-slate-50"
            }`}
          >
            -
          </button>
        </div>
      </div>

      {/* PENALTIES */}
      <div className="flex gap-10 justify-center font-bold">
        <div className="flex flex-col gap-2">
          {penaltyList.map((type) => (
            <div key={type} className="flex gap-2 items-center">
              <button
                onClick={() => addPenalty("aka", type)}
                className="bg-red-600 px-2 hover:cursor-pointer"
              >
                +
              </button>

              <button
                onClick={() => removePenalty("aka", type)}
                className="bg-red-800 px-2 hover:cursor-pointer"
              >
                -
              </button>

              <span>
                {type} ({penalties.aka[type] ?? 0}/{rule.penalties[type]})
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {penaltyList.map((type) => (
            <div key={type} className="flex gap-2 items-center">
              <button
                onClick={() => addPenalty("ao", type)}
                className="bg-slate-600 px-2 hover:cursor-pointer"
              >
                +
              </button>

              <button
                onClick={() => removePenalty("ao", type)}
                className="bg-slate-800 px-2 hover:cursor-pointer"
              >
                -
              </button>

              <span>
                {type} ({penalties.ao[type] ?? 0}/{rule.penalties[type]})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-2 font-bold justify-center mt-6">
        <button
          onClick={handleReset}
          className="bg-sky-600 px-3 py-1 rounded hover:cursor-pointer"
        >
          RESET
        </button>

        <button className="bg-sky-600 px-3 py-1 rounded" onClick={openWindow}>
          WINDOW
        </button>
      </div>
    </section>
  );
}

export default KumiteComponent;
