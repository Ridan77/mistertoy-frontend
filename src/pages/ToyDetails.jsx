import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { reviewService } from "../services/review.service.js";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../cmps/Modal.jsx";
import { Chat } from "../cmps/Chat.jsx";
import { Reviews } from "../cmps/Reviews.jsx";
import { ToyImg } from "../cmps/ToyImg.jsx";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ChatIcon from "@mui/icons-material/Chat";
import RateReviewIcon from "@mui/icons-material/RateReview";

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(false);


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

  async function getReview(toyId) {
    const review = prompt("What is your review?");
    await reviewService.addReview(toyId,review)
    setRefreshReviews(prev => !prev)
  }

  function handleIsOpen({ key }) {
    if (key === "Escape") setIsOpen(false);
  }

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId);
      console.log('toy', toy);
      setToy(toy);
    } catch (error) {
      console.error(error);
      console.log("Had issues in toy details", err);
      navigate("/toy");
    }
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
      <Reviews toyId={toy._id} refreshTrigger={refreshReviews} />
      <Modal header={`Chat about ${toy.name} toy`} footer="" isOpen={isOpen} onClose={onToggleModal}>
        <Chat toyId={toy._id}/>
      </Modal>
      <div className="btn-details">
        <button>
          <Link to={`/toy`}>
            <KeyboardBackspaceIcon />
          </Link>
        </button>
        <button>
          <Link to={`/toy/edit/${toy._id}`}>
            <EditIcon />
          </Link>
        </button>
        <button onClick={onToggleModal}>
          <ChatIcon />
        </button>
        <button onClick={() => getReview(toy._id)} className="review-btn">
          <RateReviewIcon />
        </button>
      </div>
    </section>
  );
}
