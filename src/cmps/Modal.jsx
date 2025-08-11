import { Fragment } from "react";

export function Modal({ children, isOpen = false, onClose = () => {} }) {
  if (!isOpen) return null;
  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </section>
    </Fragment>
  );
}
