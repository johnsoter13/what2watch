export const checkIfMovieIsAvailableToUser = (userStreamingServices, movie) => {
  const movieStreamingServices = Object.keys(movie?.streamingServices);
  const sharedMovieStreamingServices = [];

  movieStreamingServices.forEach((streamingService) => {
    if (userStreamingServices[streamingService]) {
      // Have to overwrite display name locally for some streaming services, if we don't have it just use what's returned
      const displayName = userStreamingServices[streamingService].displayName || movie.streamingServices[streamingService].display_name;

      sharedMovieStreamingServices.push(
        {...movie.streamingServices[streamingService], display_name: displayName}
      );
    }
  });

  if (sharedMovieStreamingServices) {
    return sharedMovieStreamingServices;
  }

  return [];
};

export const shuffleMovies = (movieArray) => {
  let shuffledArray = movieArray
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

  return shuffledArray;
};