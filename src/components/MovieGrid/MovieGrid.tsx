import css from './MovieGrid.module.css'
import type { Movie } from '../../types/movie'

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
    }

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
  {/* Набір елементів списку з фільмами */}
  {movies.map(movie => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
</ul>

  )
}

{/* <li>
    {movies.map(movie => (<div className={css.card}>
      <img 
		    className={css.image} 
		    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		    alt={movie.title} 
		    loading="lazy" 
		  />
	    <h2 className={css.title}>{movie.title}</h2>
    </div>))}
  </li> */}
