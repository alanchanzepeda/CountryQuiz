export default function OptionItem({
  text,
  state = "idle",      // "idle" | "selected" | "correct" | "wrong" (puede combinar: "correct selected")
  disabled = false,
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
      role="radio"
      aria-checked={isSelected || isCorrect}
      aria-disabled={disabled || undefined}
    >
      <span className="option__label">{text}</span>


      {showBadge && (
        <span className="option__badge" aria-hidden="true">
          {isCorrect ? "✅" : "❌"}
        </span>
      )}
    </button>
  );
}
