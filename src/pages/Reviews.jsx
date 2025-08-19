import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service.js";
import { Loader } from "../cmps/Loader.jsx";

export function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const allReviews = await reviewService.getReviews();
    setReviews(allReviews);
  }

  console.log(reviews);
  if (!reviews) return <Loader/>
  return (
    <>
      <section className="review-page">
    
        <section className="reviews-container">
          <ul>
            {reviews.map((review) => {
              return (
                <li key={review._id}>
                  
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </>
  );
}
