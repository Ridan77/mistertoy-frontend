import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service-local.js";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../cmps/Modal.jsx";
// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const { toyId } = useParams();

  useEffect(() => {
    if (toyId) loadToy();
  }, [toyId]);

  function onToggleModal() {
    setIsOpen((isOpen) => !isOpen);
  }
  function onValidate() {
    showSuccessMsg("Validate!!!!! 🥳");
    onToggleModal();
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
          perferendis tempora aspernatur sit, explicabo veritatis corrupti
          perspiciatis repellat, enim quibusdam!
        </p>
      </Modal>
      <button>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      </button>
      <button>
        <Link to={`/toy`}>Back</Link>
      </button>
      <button>
        <Link to="/toy/nJ5L4">Next Toy</Link>
      </button>
    </section>
  );
}
