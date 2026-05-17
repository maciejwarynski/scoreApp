import { useEffect, useState } from "react";

type Score = {
  judgeId: number;
  score: number;
};

type KataData = {
  scores: Score[];
  finalScore: number | null;
};

function DisplayPageKata() {
  const [data, setData] = useState<KataData>({
    scores: [],
    finalScore: null,
  });

  const getMinMaxIndexes = (scores: Score[]) => {
    if (scores.length < 5) {
      return { minIndex: null, maxIndex: null };
    }

    const allEqual = scores.every((s) => s.score === scores[0].score);

    if (allEqual) {
      return { minIndex: 0, maxIndex: 1 };
    }

    let minIndex = 0;
    let maxIndex = 0;

    scores.forEach((s, i) => {
      if (s.score < scores[minIndex].score) {
        minIndex = i;
      }

      if (s.score > scores[maxIndex].score) {
        maxIndex = i;
      }
    });

    return { minIndex, maxIndex };
  };

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("kataData");

      if (stored) {
        setData(JSON.parse(stored));
      }
    };

    loadData();

    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const { minIndex, maxIndex } = getMinMaxIndexes(data.scores);

  return (
    <main className="bg-slate-950 p-10 text-white h-dvh flex flex-col font-roboto  gap-10">
      <div>
        <section className="grid grid-cols-5 w-full gap-8">
          {data.scores.map((s, i) => {
            const isExtreme = i === minIndex || i === maxIndex;

            return (
              <div
                key={s.judgeId}
                className={`text-[clamp(1rem,8vw,10rem)] text-center font-bold ${
                  isExtreme ? "text-red-500" : ""
                }`}
              >
                {s.score.toFixed(1)}
              </div>
            );
          })}
        </section>
      </div>

      {data.finalScore !== null && (
        <div className="text-[clamp(1rem,18vw,24rem)] text-center font-bold text-sky-500">
          {data.finalScore.toFixed(1)}
        </div>
      )}
    </main>
  );
}

export default DisplayPageKata;
