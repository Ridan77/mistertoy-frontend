import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../cmps/Modal.jsx";
import { Chat } from "../cmps/Chat.jsx";
import { ToyImg } from "../cmps/ToyImg.jsx";
// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { toyId } = useParams();

  useEffect(() => {
    window.addEventListener("keyup", handleIsOpen);
    if (toyId) loadToy();
    return () => {
      window.removeEventListener("keyup", handleIsOpen);
    };
  }, [toyId]);

  function onToggleModal() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleIsOpen({ key }) {
    if (key === "Escape") setIsOpen(false);
  }

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log("Had issues in toy details", err);
        navigate("/toy");
      });
  }

  if (!toy) return <div>Loading...</div>;
  return (
    <section className="toy-details">
      <h2>Toy name : {toy.name}</h2>
      <h5>Price: ${toy.price}</h5>
      Labels: <pre> {JSON.stringify(toy.labels)}</pre>
      <p className={toy.inStock ? "in-stock" : "not-instock"}>
        {" "}
        {toy.inStock ? "In Stock" : "Not In Stock"}
      </p>
      {toy.imgUrl ? (
        <img src={`/${toy.imgUrl}`} alt="" />
      ) : (
        <ToyImg toyName={toy.name} />
      )}
      <Modal isOpen={isOpen} onClose={onToggleModal}>
        <Chat />
      </Modal>
      <div className="btn-details">
        <button onClick={onToggleModal}>Chat</button>
        <button>
          <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
        </button>
        <button>
          <Link to={`/toy`}>Back</Link>
        </button>
      </div>
    </section>
  );
}
