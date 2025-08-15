import { Link } from "react-router-dom";
import { ToyImg } from "./ToyImg";


export function ToyPreview({ toy }) {
  return (
    <article>
      <h4>{toy.name}</h4>
      {toy.imgUrl ? <img src={toy.imgUrl} alt="" /> : <ToyImg toyName={toy.name}/>}
      <p>
        Price: <span>${toy.price}</span>
      </p>
      {/* Labels: <pre> {JSON.stringify(toy.labels)}</pre> */}
       <p className="label-title">Labels</p>
       <pre>{toy.labels.join(', ')} </pre>
      <p className={toy.inStock ? "in-stock" : "not-instock"}>
        {toy.inStock ? "In Stock" : "Not In Stock"}
      </p>
      {/* {toy.owner && (
        <p>
          Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link>
        </p>
      )} */}
      <hr />
     
    </article>
  );
}
