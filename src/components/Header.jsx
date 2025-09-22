import { Link } from "react-router-dom";
import ScorePill from "./ScorePill.jsx";

export default function Header(){
  return (
    <header className="header">
      <div className="container row space-between center">
        <Link to="/quiz" className="brand">Country Quiz</Link>
        <ScorePill />
      </div>
    </header>
  );
}
