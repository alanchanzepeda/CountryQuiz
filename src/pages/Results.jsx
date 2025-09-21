export default function Results(){
  const username = "Player Demo"; // Texto fijo, sin localStorage
  const score = 7;                // Puntaje fijo de ejemplo


  function playAgain(){
    // En modo front-only, simplemente recargamos la página
    window.location.href = "/quiz";
  }


  return (
    <section className="results">
      <div className="card results-card">
        <div className="result-hero" role="img" aria-label="Confetti">🎉</div>
       
        <h2 className="subtitle center-text m0" style={{ marginBottom: 8 }}>
          ¡Felicidades, {username}!
        </h2>
       
        <p className="center-text muted" style={{ marginBottom: 24 }}>
          Respondiste {score}/10 correctamente.
        </p>
       
        <button className="btn" onClick={playAgain}>Jugar de nuevo</button>
      </div>
    </section>
  );
}
