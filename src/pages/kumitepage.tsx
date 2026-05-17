import { useState } from "react";
import { useSettings } from "../store/settingsStore";
import SettingsComponent from "../components/kumitepage_components/settingsComponent";
import KumiteComponent from "../components/kumitepage_components/kumiteComponent";
import { Navigate } from "react-router-dom";

type Tab = "settings" | "kumite";

function KumitePage() {
  const [tab, setTab] = useState<Tab>("settings");
  const { category } = useSettings();

  const handleTab = (selectedTab: Tab) => {
    if (!category) {
      return <Navigate to="/" />;
    }

    if (tab === selectedTab) return;
    setTab(selectedTab);
  };
  return (
    <>
      <header className="w-full flex justify-center items-center gap-4 font-bold text-sky-600">
        <div
          onClick={() => handleTab("kumite")}
          className={`cursor-pointer transition-all duration-200 ease-out
      ${
        tab === "kumite"
          ? "opacity-100 scale-110 border-b text-2xl"
          : "opacity-60 scale-95 text-xl"
      }`}
        >
          KUMITE
        </div>

        <div
          onClick={() => handleTab("settings")}
          className={`cursor-pointer transition-all duration-200 ease-out
      ${
        tab === "settings"
          ? "opacity-100 scale-110 border-b text-2xl"
          : "opacity-60 scale-95 text-xl"
      }`}
        >
          SETTINGS
        </div>
      </header>
      <section>
        {tab === "settings" ? <SettingsComponent /> : <KumiteComponent />}
      </section>
    </>
  );
}

export default KumitePage;
