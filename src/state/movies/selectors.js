export const selectMovieGenres = (state) => state.movies.genres
export const selectMovies = (state) => state.movies.movies
export const selectMovie = (state, movieId) => state.movies.movies[movieId]
export const selectMoviesByGenre = (state, genre) =>
  state.movies.moviesByGenre[genre] || []

export const selectMostPopularMoviesExists = (state) =>
  state.movies.mostPopularMovies?.length > 0
export const selectMoviesByGenreExists = (state, genre) =>
  state.movies.moviesByGenre[genre]?.length > 0
export const selectMovieStreamingServices = (state) =>
  state.movies.movieStreamingServices

export const selectMovieStreamingServicesById = (state, movieId) =>
  state.movies.movieStreamingServices[movieId]

export const selectMovieIndex = (state, genre) =>
  state.movies.movieIndexes[genre] || 0
export const selectMoviesByGenreLoadingStatus = (state) =>
  state.movies.moviesByGenreLoadingStatus
export const selectMovieStreamingServicesLoadingStatus = (state) =>
  state.movies.movieStreamingServicesLoadingStatus

export const selectMovieIdByIndex = (state, genre, index) =>
  state.movies.moviesByGenre[genre][index]

export const selectMostPopularMovies = (state, index = 0) =>
  state.movies.mostPopularMovies?.[index]

export const selectCurrentMovieId = (state) => state.movies.currentMovieId
export const selectCurrentGenre = (state) => state.movies.currentGenre
