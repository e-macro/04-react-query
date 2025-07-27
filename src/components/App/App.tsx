import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import { fetchMovies } from '../../services/movieService'
// import type { MoviesResponse } from '../../types/movie'
import type { MoviesResponse } from '../../services/movieService'
import MovieGrid from '../MovieGrid/MovieGrid'
import type { Movie } from '../../types/movie'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import { keepPreviousData } from '@tanstack/react-query'
import ReactPaginate from 'react-paginate'

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const openModal = (movie: Movie) => {
  setSelectedMovie(movie);
};
  const closeModal = () => setSelectedMovie(null);
  const { data, isLoading, isError, isSuccess } = useQuery<MoviesResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(page, query),
    enabled: query !== '', 
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.total_pages || 1; // Use total_pages from the first movie or default to 1

  useEffect(() =>{ if (isSuccess && data?.results.length === 0) {
        toast.error('No movies found for your request.'); 
      }}, [isSuccess, data])
  const handleSearch = (query: string) => {
    // try {
      setQuery(query); 
      setPage(1);
    // } catch (error) {
    //   console.error('Error fetching movies:', error);
    //   toast.error('Failed to fetch movies. Please try again later.');
    // }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch}/>
      {isSuccess && totalPages > 1 && (<ReactPaginate
	      pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />)}
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      <MovieGrid onSelect={openModal} movies={data?.results ?? []}/>
      {selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={closeModal}/>
)}
    <Toaster position="top-center" />
    </div>
  )
}