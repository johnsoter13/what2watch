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
