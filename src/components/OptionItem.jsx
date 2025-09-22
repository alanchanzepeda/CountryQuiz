import bienIcon from "/src/assets/bien.svg";
import malIcon from "/src/assets/mal.svg";

export default function OptionItem({
  text,
  state = "idle",
  disabled = false,
  onClick,
}) {
  const s = String(state || "idle");
  const isSelected = s.includes("selected");
  const isCorrect  = s.includes("correct");
  const isWrong    = s.includes("wrong");
  const showBadge  = isCorrect || isWrong;

  return (
    <button
      type="button"
      className={`option ${s !== "idle" ? s : ""}`}
      disabled={disabled}
      onClick={onClick}
      role="radio"
      aria-checked={isSelected || isCorrect}
      aria-disabled={disabled || undefined}
    >
      <span className="option__label">{text}</span>

      {showBadge && (
        <span className="option__badge" aria-hidden="true">
          <img
            src={isCorrect ? bienIcon : malIcon}
            alt={isCorrect ? "Correcto" : "Incorrecto"}
          />
        </span>
      )}
    </button>
  );
}
