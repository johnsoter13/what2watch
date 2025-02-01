const PROD_URL = 'http://ec2-13-59-211-123.us-east-2.compute.amazonaws.com:3000'
const LOCAL_HOST = 'http://localhost:3000'

export const fetchMovieGenres = () =>
  fetch(`${LOCAL_HOST}/fetchGenres`, {
    method: 'GET',
  })

export const fetchMovieDetails = (movieId) =>
  fetch(`${LOCAL_HOST}/fetchDetails/${movieId}`, {
    method: 'GET',
  })

export const fetchMoviesByGenre = ({
  orderDirection = 'desc',
  orderBy = 'rating',
  genre,
  country = 'us',
  seriesGranularity = 'show',
  showType = 'movie',
  outputLanguage = 'en',
}) =>
  fetch(
    `${LOCAL_HOST}/fetchMoviesByGenre?genre=${genre}&?series_granularity=${seriesGranularity}&output_language=${outputLanguage}&country=${country}&show_type=${showType}&order_direction=${orderDirection}&order_by=${orderBy}`,
    {
      method: 'GET',
    }
  )

export const fetchMovieStreamingServices = ({
  movieId,
  seriesGranularity = 'show',
  outputLanguage = 'en',
  country = 'us',
}) =>
  fetch(
    `${LOCAL_HOST}/fetchMediaFromMovieId/${movieId}?series_granularity=${seriesGranularity}&output_language=${outputLanguage}&country=${country}`,
    {
      method: 'GET',
    }
  )

export const fetchMovieFromSearch = ({
  country = 'us',
  seriesGranularity = 'show',
  showType = 'movie',
  outputLanguage = 'en',
  query,
}) =>
  fetch(
    `${LOCAL_HOST}/fetchMediaFromSearch?country=${country}&title=${query}&series_granularity=${seriesGranularity}&show_type=${showType}&output_language=${outputLanguage}`,
    {
      method: 'GET',
    }
  )

export const fetchMostPopularMovies = () =>
  fetch(`${LOCAL_HOST}/fetchMostPopular`, {
    method: 'GET',
  })
