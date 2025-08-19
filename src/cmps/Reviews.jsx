import { useEffect, useState } from "react";
import { utilService } from "../services/util.service.js";
import { reviewService } from "../services/review.service.js";

export function Reviews({ toyId,refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchReviews(toyId);
  }, [toyId,refreshTrigger]);

  async function fetchReviews(toyId) {
    const allReviews = await reviewService.getReviews({ toyId });
    setReviews(allReviews);
  }

  console.log(reviews);

  return (
    <>
      <p>Reviews:</p>;
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review._id}>
              Review: {review.txt}, by: {review.userId}
            </li>
          );
        })}
      </ul>
    </>
  );
}
