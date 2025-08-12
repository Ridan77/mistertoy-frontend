import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service-local.js";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../cmps/Modal.jsx";
import { Chat } from "../cmps/Chat.jsx";
// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { toyId } = useParams();

  useEffect(() => {
    if (toyId) loadToy();
  }, [toyId]);

  function onToggleModal() {
    setIsOpen((isOpen) => !isOpen);
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
      <img src={`../${toy.imgUrl}`} alt="" />
      <button onClick={onToggleModal}>Chat</button>
      <Modal isOpen={isOpen} onClose={onToggleModal}>
        <Chat />
      </Modal>
      <button>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      </button>
      <button>
        <Link to={`/toy`}>Back</Link>
      </button>
    </section>
  );
}
