export const selectMovieGenres = (state) => state.movies.genres;
export const selectMoviesByGenre = (state) => state.movies.moviesByGenre;
export const selectMovieStreamingServices = (state) =>
  state.movies.movieStreamingServices;
export const selectMovieStreamingServicesByGenre = (state, genre) => {
  const movies = state.movies?.movieStreamingServices;

  const moviesByGenre = Object.values(movies).filter(
    (movie) => movie.genre === genre
  );
  return moviesByGenre;
};
