import Header from "/src/components/Header.jsx";
import Footer from "/src/components/Footer.jsx";
import Bubble from "/src/components/Bubble.jsx";
import ProgressBar from "/src/components/ProgressBar.jsx";
import OptionItem from "/src/components/OptionItem.jsx";
import Results from "/src/pages/Results.jsx";

export default function App(){
  return (
    <div className="app">
      <Header />


      <main className="main">
        <section className="container section">
          <div className="card quiz-card">
            <h1 className="title">Country Quiz (Front-only)</h1>
            <p className="muted">Paso 4: header y footer agregados.</p>


            <div className="bubbles" aria-label="Navegación de preguntas">
              {Array.from({ length: 10 }).map((_, i) => (
                <Bubble key={i} number={i + 1} active={i === 0} />
              ))}
            </div>


            <h2 className="subtitle" style={{ textAlign: "center", marginBottom: 12 }}>
              ¿Cuál es la capital de “País Demo”?
            </h2>


            <div className="quiz-toprow">
              <div className="spacer" />
              <ProgressBar value={3} max={10} />
              <div className="spacer" />
            </div>


            <div className="options" role="radiogroup" aria-label="Opciones de respuesta">
              <OptionItem text="Opción A" state="idle" />
              <OptionItem text="Opción B" state="selected" />
              <OptionItem text="Opción C" state="correct selected" disabled />
              <OptionItem text="Opción D" state="wrong" disabled />
            </div>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
}
