export const selectMovieGenres = (state) => state.movies.genres;
export const selectMoviesByGenre = (state) => state.movies.moviesByGenre;
export const selectMovieStreamingServices = (state) =>
  state.movieStreamingServices;
