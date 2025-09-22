export default function Bubble({ number, active=false, answered=false, onClick }) {
  const cls = [
    "bubble",
    active ? "active" : "",
    answered ? "answered" : "",
  ].join(" ").trim();

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-pressed={answered}
    >
      {number}
    </button>
  );
}
