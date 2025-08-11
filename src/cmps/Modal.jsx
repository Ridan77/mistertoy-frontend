import { useState } from "react";
import { Fragment } from "react";

export function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  const [lineToEdit, setLineToEdit] = useState("");

  function handleChange({ target }) {
    const value = target.value;
    setLineToEdit((prevLine) => prevLine + value);
  }

  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <header>Chat</header>
        <main>
          {children.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </main>
        <footer>Footer</footer>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </section>
    </Fragment>
  );
}
