import { useState } from 'react'

export function ToyImg({ toyName }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoad() {
        setImgLoading(false)
    }

    return (
        <div className="img-container">
            {isImgLoading && <div className="skeleton-loader"></div>}
            <img 
                src={`https://robohash.org/${toyName}?set=set1`}
                alt={toyName}
                title={toyName}
                onLoad={handleImageLoad}
                className={isImgLoading ? 'edit-img' : 'loaded edit-img'}
            />
        </div>
    )
}
