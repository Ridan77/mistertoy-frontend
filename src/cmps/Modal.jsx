import { useState } from "react";
import { Fragment } from "react";

export function Modal({ children, isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;
  const [lineToEdit, setLineToEdit] = useState("");

  function handleChange({ target }) {
    const value = target.value;
    setLineToEdit(value);
  }
  console.log(lineToEdit);

  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <header>Chat</header>
        <main>
          {children.map((line, idx) => (
            <div className="line" key={idx}>{line}</div>
          ))}
          <form
            onSubmit={(ev) => {
              onSubmit(ev);
              setLineToEdit("");
            }}>
            <input
              autoFocus
              className="line-input"
              type="text"
              id="txt"
              value={lineToEdit}
              placeholder="Your answer... "
              onChange={handleChange}
            />
          </form>
        </main>
        <footer>Footer</footer>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </section>
    </Fragment>
  );
}
