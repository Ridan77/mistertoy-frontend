import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service.js";
import { Loader } from "../cmps/Loader.jsx";
import { useNavigate } from "react-router-dom";

export function ExploreReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const allReviews = await reviewService.getReviews();
    setReviews(allReviews);
  }

  console.log(reviews);
  if (!reviews) return <Loader />;
  return (
    <>
      <section className="review-page">
        <section className="reviews-container">
          <table className="review-table">
            {reviews.map((review) => {
              return (
                <tr key={review._id}>
                  <td className="td-review">{review.txt}</td>
                  <td>
                    <span className="pill">
                      <span className="label">By:</span>{" "}
                      {review.byUser.fullname}
                    </span>
                  </td>
                  <td className="review-toy-link">
                      <a href={`/toy/${review.toy._id}`}>
                      <span className="pill">
                      <span className="label">At: </span>{review.toy.name}
                      </span>
                      </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </section>
      </section>
    </>
  );
}
