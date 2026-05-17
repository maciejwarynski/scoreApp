import { useState } from "react";

import { useSettings } from "../../store/settingsStore";

function SettingsComponent() {
  const {
    akaName,
    aoName,
    category,
    minutes,
    seconds,
    setAkaName,
    setAoName,
    setCategory,
    setMinutes,
    setSeconds,
  } = useSettings();
  return (
    <section className="flex flex-col font-roboto justify-center items-center mt-44">
      <div className="flex flex-col gap-6 w-96 p-6  bg-slate-100 rounded-lg">
        <div className="flex flex-col gap-4">
          <h1 className="text-sky-600 text-xl font-bold text-center">
            COMPETITORS NAMES:
          </h1>
          <div className=" flex flex-col gap-2">
            <div className="flex gap-2">
              <h1>AKA:</h1>
              <input
                className="text-center shadow w-full"
                type="text"
                value={akaName}
                onChange={(e) => setAkaName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <h1>AO/SHIRO:</h1>
              <input
                className="text-center shadow w-full"
                type="text"
                value={aoName}
                onChange={(e) => setAoName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-xl text-sky-600 font-bold">
            POINTS:
          </h1>
          <div className="flex flex-col gap-2">
            {[
              "IPPON",
              "NIHON",
              "SANBON",
              "ROTATION NIHON",
              "ROTATION SANBON",
            ].map((val) => (
              <label key={val} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="penalty"
                  value={val}
                  checked={category === val}
                  onChange={() => setCategory(val)}
                />
                {val}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text- text-xl text-sky-600 font-bold text-center">
            TIME:
          </h1>
          <div className=" flex flex-col gap-2">
            <div className="flex gap-2">
              <h1>MINUTES:</h1>
              <input
                className="text-center shadow w-full"
                type="text"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <h1>SECONDS:</h1>
              <input
                className="text-center shadow w-full"
                type="text"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsComponent;
