
export default function Movie(props) {
    return (
        <div className="card"> 
            <img className="image" src= {props.image} width={250} height={250} />
            <h3>{props.name}</h3>
            <h4 className="desc">{props.description}</h4>
            <p>Year: {props.year}</p>
            <p>Rating: {props.rating}</p>
            {/* <p>Genre: {props.genre}</p> */}
            <div className="genres">
                {props.genre.split(', ').map((genre, index) => (
                    <span key={index} className="genre-bubble">{genre}</span>
                ))}
            </div>
            <div className="button-div">
            <button className="like-button" onClick={() => props.toggleLike(props.name)}>
                {props.isLiked ? '❤️' : '🤍'}
                <span className="pop-up">{props.isLiked ? "Remove from Favorites" : "Add to Favorites"}</span>

            </button>
            </div>
        </div>
    );
        
}