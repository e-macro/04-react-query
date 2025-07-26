import axios from "axios";
// import type { Movie } from "../types/movie";
import type { MoviesResponse } from "../types/movie";

export const fetchMovies = async (page: number, query: string): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie`, {
    params: {
        page: page,
        query: query,
        include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}