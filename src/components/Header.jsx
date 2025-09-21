import { Link } from "react-router-dom";


export default function Header(){
  return (
    <header className="header">
      <div className="container row space-between center">
        <Link to="/" className="brand">Country Quiz</Link>
        <div className="score-pill" aria-live="polite">🏆 0 / 10</div>
      </div>
    </header>
  );
}
