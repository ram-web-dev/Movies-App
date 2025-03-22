import './index.css'

import {Link} from 'react-router-dom'

const MoviesList = ({moviesList}) => (
  <ul className="movies-list">
    {moviesList?.map(movie => (
      <li key={movie.id} className="movie-item">
        <Link to={`/movies/${movie.id}`}>
          <img src={movie.poster_path} className="movie-poster" />
        </Link>
      </li>
    ))}
  </ul>
)

export default MoviesList
