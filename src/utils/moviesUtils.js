export const checkIfMovieIsAvailableToUser = (userStreamingServices, movie) => {
  const movieStreamingServices = Object.keys(movie.streamingServices);
  const sharedMovieStreamingServices = [];

  movieStreamingServices.forEach((streamingService) => {
    if (userStreamingServices[streamingService]) {
      sharedMovieStreamingServices.push(
        movie.streamingServices[streamingService]
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