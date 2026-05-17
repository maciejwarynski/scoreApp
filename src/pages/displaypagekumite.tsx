import { useEffect, useState } from "react";
import { loadState } from "../store/localstorageStore";
import { rules } from "../rules/rules";

export default function DisplayPage() {
  const [state, setState] = useState<any>(loadState());
  const rule = state?.category ? rules[state.category] : null;
  const penaltyList = rule ? Object.keys(rule.penalties) : [];

  const penaltyLabels: Record<string, string> = {
    atenai: "A:",
    mubobi: "M:",
    jogai: "J:",
    chukoku: "C:",
  };

  const renderPenaltyBoxes = (
    fighter: "aka" | "ao",
    type: string,
    max: number
  ) => {
    const count = state?.penalties?.[fighter]?.[type] ?? 0;

    const activeColor =
      fighter === "aka"
        ? "bg-red-600"
        : state.category === "IPPON"
        ? "bg-slate-50"
        : "bg-sky-600";
    const borderColor =
      fighter === "aka"
        ? "border-red-600"
        : state.category === "IPPON"
        ? "border-slate-50"
        : "border-sky-600";

    return Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className={`w-20 h-20 border ${borderColor} ${
          i < count ? activeColor : "bg-transparent"
        }`}
      />
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setState(loadState());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!state) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        No data
      </div>
    );
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;

    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="h-screen w-screen font-roboto bg-gray-900 text-white flex flex-col">
      {/* <div className="flex gap-20">
        <div className="text-red-500">{state.akaPoints}</div>
        <div>{state.timeLeft}</div>
        <div className="text-white">{state.aoPoints}</div>
      </div> */}
      <div className="h-1/3 p-4 bg-neutral-950 flex justify-between">
        <div>
          <div className="text-[clamp(1rem,6vw,14rem)]">
            {state.akaName?.toUpperCase()}
          </div>

          <div className="flex gap-2 mt-4">
            {rule &&
              penaltyList.map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="w-10 text-red-500 font-bold text-end">
                    {penaltyLabels[type] ?? type}
                  </span>

                  {renderPenaltyBoxes("aka", type, rule.penalties[type])}
                </div>
              ))}
          </div>
        </div>

        <div className="text-[clamp(1rem,12vw,20rem)] font-bold text-red-600">
          {state.akaPoints}
        </div>
      </div>
      <div className="h-1/3 p-4 bg-slate-900 flex justify-between">
        <div>
          <div className="text-[clamp(1rem,6vw,14rem)]">
            {state.aoName?.toUpperCase()}
          </div>

          <div className="flex gap-2 mt-4">
            {rule &&
              penaltyList.map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <span
                    className={`w-10 font-bold text-end ${
                      state.category === "IPPON"
                        ? "text-slate-50"
                        : "text-sky-600"
                    }`}
                  >
                    {penaltyLabels[type] ?? type}
                  </span>

                  {renderPenaltyBoxes("ao", type, rule.penalties[type])}
                </div>
              ))}
          </div>
        </div>

        <div
          className={`text-[clamp(1rem,12vw,20rem)] font-bold  ${
            state.category === "IPPON" ? "text-slate-50" : "text-sky-600"
          }`}
        >
          {state.aoPoints}
        </div>
      </div>

      <div className="h-1/3 bg-black text-[clamp(1rem,12vw,20rem)] text-amber-200 flex justify-center items-center font-bold">
        {formatTime(state.timeLeft)}
      </div>
    </div>
  );
}
