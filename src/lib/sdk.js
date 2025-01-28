import Firebase, { db } from '../../config/Firebase'

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

// export const fetchMoviesByGenre = (genre) =>
//   fetch(
//     `${LOCAL_HOST}/fetchMoviesByGenre?genre=${genre}`,
//     {
//       method: 'GET',
//     }
//   );

export const fetchMovieStreamingServices = (movieId) =>
  fetch(
    `${LOCAL_HOST}/fetchStreamingServices?country=us&source_id=${movieId}&source=imdb`,
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

export const createUserWithEmailAndPassword = (email, password) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password)

export const loginUserWithEmailandPassword = (email, password) =>
  Firebase.auth().signInWithEmailAndPassword(email, password)

export const fetchUserDatabase = (uid) => db.ref('/users/' + uid)

export const fetchRoomsDatabase = (rid) => db.ref('/rooms/' + rid)
