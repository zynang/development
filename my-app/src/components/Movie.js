
export default function Movie(props) {
    return (
        <div className="card"> 
            <img className="image" src= {props.image} width={250} height={250} />
            <h3>{props.name}</h3>
            <h4 className="desc">{props.description}</h4>
            <p>Year: {props.year}</p>
            <p>Rating: {props.rating}</p>
            <p>Genre: {props.genre}</p>
            <div className="button-div">
            <button className="like-button" onClick={() => props.toggleLike(props.name)}>{props.isLiked ? '❤️' : '🤍'}</button>
            </div>
        </div>
    );
        
}