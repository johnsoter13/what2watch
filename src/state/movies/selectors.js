import STREAMING_SERVICES from "../../components/StreamingServiceList/constants";

export const selectMovieGenres = (state) => state.movies.genres;
export const selectMoviesByGenre = (state) => state.movies.moviesByGenre;
export const selectMovieStreamingServices = (state) =>
  state.movies.movieStreamingServices;
export const selectMovieStreamingServicesByGenre = (
  state,
  genre,
  userStreamingServices
) => {
  const movies = state.movies?.movieStreamingServices;
  // const streamingServiceKeys = Object.keys();

  const filteredMovies = Object.values(movies).reduce((acc, movie) => {
    if (movie.genre === genre) {
      const movieStreamingPlatformsShared = [];
      Object.keys(movie.streamingServices).forEach((streamingService) => {
        if (userStreamingServices[streamingService]) {
          movieStreamingPlatformsShared.push(
            movie.streamingServices[streamingService]
          );
        }
      });
      if (movieStreamingPlatformsShared.length > 0) {
        acc.push({ ...movie, movieStreamingPlatformsShared });
      }
      return acc;
    }
    return acc;
  }, []);

  return filteredMovies;
};
