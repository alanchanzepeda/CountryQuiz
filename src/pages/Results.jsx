import congratsImg from "/src/assets/congrats.png";

export default function Results(){
  const username = localStorage.getItem("quiz.username") || "Jugador";
  const score = Number(sessionStorage.getItem("quiz.score") || 0);
  const total = Number(sessionStorage.getItem("quiz.total") || 10);

  function playAgain(){
    sessionStorage.removeItem("quiz.answers");
    sessionStorage.removeItem("quiz.round");
    sessionStorage.removeItem("quiz.score");
    sessionStorage.removeItem("quiz.total");
    window.location.href = "/quiz";
  }

  return (
    <section className="results">
      <div className="card results-card">
        {/* 👇 Hero con imagen completa */}
        <div className="result-hero">
          <img className="result-hero-img" src={congratsImg} alt="Felicidades" />
        </div>

        <h2 className="subtitle center-text m0" style={{ marginBottom: 8 }}>
          ¡Felicidades, {username}!
        </h2>

        <p className="center-text muted" style={{ marginBottom: 24 }}>
          Respondiste {score}/{total} correctamente.
        </p>

        <button className="btn" onClick={playAgain}>Jugar de nuevo</button>
      </div>
    </section>
  );
}
