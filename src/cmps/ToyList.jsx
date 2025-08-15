import { ToyPreview } from "./ToyPreview.jsx";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';



export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div>
            <button onClick={() => onRemoveToy(toy._id)}>
              <DeleteOutlineIcon />
            </button>
            {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
            <button>
              <Link to={`/toy/edit/${toy._id}`}>
              <EditIcon/>
              </Link>
            </button>
            <button>
              <Link to={`/toy/${toy._id}`}><InfoIcon/></Link>
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
