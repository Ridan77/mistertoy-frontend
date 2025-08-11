import { ToyPreview } from "./ToyPreview.jsx";
import { Link } from "react-router-dom";

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div>
            <button onClick={() => onRemoveToy(toy._id)}>x</button>
            {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
          <button>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
          </button>
          <button>
            <Link to={`/toy/${toy._id}`}>Details</Link>
          </button>
          </div>
          {/* <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button> */}
        </li>
      ))}
    </ul>
  );
}
