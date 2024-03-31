import "./App.css";
import { useState } from "react";
import movieData from "./assets/movie-data.json";
import Movie from "./components/Movie";


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

  const [cart, setCart] = useState([]);
  const [filterYear, setFilterYear] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All Genres');
  const [sortRating, setSortRating] = useState(false); // false means no sorting, true means sorted by rating



  const toggleLike = (movieName) => {
    setCart((currentCart) => {
      if (currentCart.includes(movieName)) {
        return currentCart.filter(name => name !== movieName);
      } else {
        return [...currentCart, movieName];
      }
    });
  };


  const getUniqueGenres = (movies) => {
    const allGenres = movies.flatMap((movie) => movie.genre.split(', '));
    return ['All Genres', ...new Set(allGenres)];
  };

  const appName= "ur fav movies"

  const filteredMovies = movieData.filter((movie) => {
    const matchesYear = filterYear === 'All' || movie.year.toString() === filterYear;
    const matchesRating = filterRating === 'All' || movie.rating >= parseFloat(filterRating);
    const matchesGenre = filterGenre === 'All Genres' || movie.genre.includes(filterGenre);
    return matchesYear && matchesRating && matchesGenre;
  });

  const filteredAndSortedMovies = filteredMovies.sort((a, b) => {
    if (sortRating) {
      return b.rating - a.rating;
    }
    return filteredMovies.indexOf(a) - filteredMovies.indexOf(b);
  });


  const uniqueGenres = getUniqueGenres(movieData);

  return (
    <div className="App">

      <h1 className="title">{appName}</h1>

      <div className="menu-bar">

        <button className="dropdown" onClick={() => setSortRating(!sortRating)}>
          {sortRating ? "Unsort Rating (Alphabetical)" : "Sort by Rating (High to Low)"}
        </button>

        <div className="year-filter">
          <select className="dropdown" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
          <option value="All">All Years</option>
          {[...new Set(movieData.map(movie => movie.year))].sort().map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
          </select>

        </div>
        <div className="rating-filter">
          <select className="dropdown" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
            <option value="All">All Ratings</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div>
          <select className="dropdown" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        </div>

       
        
      </div>

      <div className="display">
        <div class="menu"> 
        
          {filteredAndSortedMovies.map((item, index) => (
            <Movie 
              key={index}
              item={item} 
              index={index} 
              name={item.name} 
              image={item.image} 
              description={item.description} 
              year={item.year}
              rating={item.rating} 
              genre={item.genre}
              toggleLike={() => toggleLike(item.name)}
              isLiked={cart.includes(item.name)}
            />
          ))}
        </div>


        <div className="cart">
          <h2>Liked Movies</h2>
            <ul>
              {cart.map((movieName, index) => (
                <li key={index}>{movieName}</li>
              ))}
            </ul>
        </div>

      </div>

      
    </div>
  );
}

export default App;