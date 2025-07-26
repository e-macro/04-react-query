export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    // total_pages: number; // Optional, used for pagination
}

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}