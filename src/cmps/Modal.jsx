import { Children } from "react";
import { useState } from "react";
import { Fragment } from "react";

export function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Fragment>
      <section onClick={onClose} className="modal-backdrop"></section>
      <section className="modal-content">
        <section className="modal-header" >Chat:</section>
        <main>{children}</main>
        <section className="modal-footer" ></section>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </section>
    </Fragment>
  );
}
