export const checkIfMovieIsAvailableToUser = (userStreamingServices, movie) => {
  const { movieStreamServices } = movie
  const sharedMovieStreamingServices = []

  movieStreamServices?.forEach((streamingService) => {
    if (userStreamingServices[streamingService.service.id]) {
      const displayName =
        userStreamingServices[streamingService.service.id].displayName

      sharedMovieStreamingServices.push({ ...streamingService, displayName })
    }
  })

  if (sharedMovieStreamingServices.length) {
    return sharedMovieStreamingServices
  }

  return []
}

export const shuffleMovies = (movieArray) => {
  let shuffledArray = movieArray
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

  return shuffledArray
}
