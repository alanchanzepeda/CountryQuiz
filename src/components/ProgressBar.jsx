import { useEffect, useState } from "react";
import { scoreBus } from "/src/store/scoreBus.js";

export default function ScorePill(){
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    const read = () => {
      setScore(Number(sessionStorage.getItem("quiz.score") || 0));
      setTotal(Number(sessionStorage.getItem("quiz.total") || 10));
    };
    read();

    const onScore = () => read();
    scoreBus.addEventListener("score", onScore);

    const onStorage = () => read();
    window.addEventListener("storage", onStorage);

    return () => {
      scoreBus.removeEventListener("score", onScore);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return <div className="score-pill" aria-label="Puntaje actual">🏆 {score}/{total}</div>;
}
