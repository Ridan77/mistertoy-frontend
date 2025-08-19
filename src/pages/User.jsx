import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service.js";

export function User() {
  const loggedInUser = useSelector(
    (storeState) => storeState.userModule.loggedInUser
  );
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const allReviews = await reviewService.getReviews({
      userId: loggedInUser._id,
    });
    setReviews(allReviews);
  }

  console.log(reviews);
  if (!loggedInUser) return <p>No user logged in</p>;
  return (
    <>
      <section className="user-page">
        <section className="user-details">
          <p>User ID:{loggedInUser._id}</p>
          <p>Full Name:{loggedInUser.fullname}</p>
        </section>
        <section className="user-reviews">
          <ul>
            {reviews.map((review) => {
              return (
                <li key={review._id}>
                  <pre>
                    Review given for toy: {review.toy.name}: {review.txt}
                  </pre>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </>
  );
}
