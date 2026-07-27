import "./PropertyCard.css";

function PropertyCard({ image, title, price, rating, guestFavorite, original, location }){
    return(

        <div className="property-card">

            <div className="image-box">

{guestFavorite && (
    <div className="guest-favorite">
        Guest favorite
    </div>
)}

{original && (
    <div className="guest-favorite">
        Original
    </div>
)}

<img
    src={image}
    alt="property"
/>

                <button className="heart">
                    ♡
                </button>

            </div>





<div className="property-info">

    <h3 className="title">
    {title}
</h3>

<p className="location">
{location}
</p>
    <div className="bottom-row">

        <p className="price">
    {price}
</p>
        <div className="rating">

            <span>★</span>

            <span>{rating}</span>

        </div>

    </div>

</div>






        </div>

    )

}

export default PropertyCard;