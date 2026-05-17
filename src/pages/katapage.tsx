import { useEffect, useState } from "react";

type Score = {
  judgeId: number;
  score: number;
};

function KataPage() {
  const [scoreInput, setScoreInput] = useState<string>("");
  const [scores, setScores] = useState<Score[]>([]);
  const [inputActive, setInputActive] = useState<boolean>(true);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const calculateScore = (scores: Score[]) => {
    // funkcja do obliczania glownej noty
    const sorted = [...scores].sort((a, b) => a.score - b.score); // sorrtujemy od najmniejszej do najwiekszej

    const middle = sorted.slice(1, -1); // usuwamy najmniejsza i najwiekzs

    const final = middle.reduce((sum, s) => sum + s.score, 0); // dodajemy 3 pozostale do sibie

    const rounded = Number(final.toFixed(1)); // zaokraglamy wunik do jednego miejsca po przecinku
    setFinalScore(rounded);
  };

  const openWindow = () => {
    window.open("/displayKata", "kata-display", "width=1920,height=1080");
  };

  useEffect(() => {
    localStorage.setItem(
      "kataData",
      JSON.stringify({
        scores,
        finalScore,
      })
    );
  }, [scores, finalScore]);

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // przyjmujemy tylko liczby
    if (value.length === 0) {
      setScoreInput("");
      return;
    }

    if (value.length === 1) {
      setScoreInput(value + "."); //po wpisaniu np 7 automatycznie nam doda kropke
    }

    if (value.length === 2) {
      const formatted = `${value[0]}.${value[1]}`; // jak do 7 dopiszemy kolejna liczbe np 1 to zrobi sie z tego 7.1

      setScoreInput(formatted);

      setScores((prev) => {
        const updated = [
          ...prev,
          { judgeId: prev.length + 1, score: Number(formatted) },
        ];

        if (updated.length >= 5) {
          setInputActive(false);
          calculateScore(updated);
        }

        return updated;
      });

      setScoreInput(""); // resetujeym inputa
    }
  };

  const handleReset = () => {
    setScores([]);
    setScoreInput("");
    setFinalScore(null);
    setInputActive(true);
  };

  const getMinMaxIndexes = (scores: Score[]) => {
    if (scores.length < 5) {
      return { minIndex: null, maxIndex: null };
    } else {
      const allEqual = scores.every((s) => s.score === scores[0].score);

      if (allEqual) {
        return { minIndex: 0, maxIndex: 1 };
      }

      let minIndex = 0;
      let maxIndex = 0;

      scores.forEach((s, i) => {
        if (s.score < scores[minIndex].score) minIndex = i;
        if (s.score > scores[maxIndex].score) maxIndex = i;
      });

      return { minIndex, maxIndex };
    }
  };

  const { minIndex, maxIndex } = getMinMaxIndexes(scores);

  return (
    <div className="w-full h-dvh flex flex-col">
      <main className="bg-slate-950 text-slate-100 h-full flex flex-col items-center justify-between w-full p-4">
        <section className="grid grid-cols-5 justify-between w-full ">
          {scores.map((score, i) => {
            const isExtreme = i === minIndex || i === maxIndex;

            return (
              <div key={score.judgeId} className="flex flex-col items-center">
                <h1
                  className={`text-[clamp(1rem,5vw,5rem)] ${
                    isExtreme ? "text-red-500 font-bold" : ""
                  }`}
                >
                  {score.score.toFixed(1)}
                </h1>
              </div>
            );
          })}
        </section>
        {inputActive ? (
          <section>
            <input
              value={scoreInput}
              onChange={handleScoreChange}
              className="w-[3ch] p-2 text-center text-[clamp(1rem,5vw,5rem)]"
              placeholder="_._"
            />
          </section>
        ) : (
          <div className="text-white text-[clamp(2rem,6vw,6rem)]">
            {finalScore !== null && finalScore.toFixed(1)}
          </div>
        )}

        <div
          className="p-2 bg-sky-600 font-bold rounded-sm hover:bg-sky-500 cursor-pointer"
          onClick={handleReset}
        >
          RESET
        </div>
        <div
          className="p-2 bg-sky-600 font-bold rounded-sm hover:bg-sky-500 cursor-pointer"
          onClick={openWindow}
        >
          WINDOW
        </div>
      </main>
    </div>
  );
}

export default KataPage;
