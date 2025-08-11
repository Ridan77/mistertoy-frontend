import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={toy.imgUrl} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            Labels: <pre> {JSON.stringify(toy.labels)}</pre>
            <p className={toy.inStock ? 'in-stock' : 'not-instock'} >{toy.inStock ? 'In Stock' : 'Not In Stock'}</p>
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}