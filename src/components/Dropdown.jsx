import { useEffect, useRef, useState } from "react";

export default function Dropdown({ name, value, options, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key !== "Escape" || !open) return;
      // Stop the modal's own Escape handler from also dismissing the modal
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (opt) => {
    setOpen(false);
    onChange({ target: { name, value: opt } });
  };

  return (
    <div className={`dropdown${open ? " dropdown-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="dropdown-trigger"
        data-empty={value ? "false" : "true"}
        aria-label={placeholder}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dd-text">{value || placeholder}</span>
        <span className="dd-caret" aria-hidden="true" />
      </button>

      {open && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className="dropdown-option"
                role="option"
                aria-selected={opt === value}
                onClick={() => select(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Keeps the field name in the submit payload / form data */}
      <input type="hidden" name={name} value={value} readOnly />
    </div>
  );
}
