import Firebase, { db } from '../../config/Firebase';

export const fetchMovieGenres = () =>
  fetch('https://imdb8.p.rapidapi.com/title/list-popular-genres', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': 'c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022',
      useQueryString: true,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

export const fetchMovieDetails = (movieId) =>
  fetch(
    `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${movieId}&currentCountry=US`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022',
        useQueryString: true,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

export const fetchMoviesByGenre = (genre) =>
  fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=${genre}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022',
        useQueryString: true,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

export const fetchMovieStreamingServices = (movieId) =>
  fetch(
    `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=us&source_id=${movieId}&source=imdb`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host':
          'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
        'x-rapidapi-key': 'c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022',
        useQueryString: true,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

export const fetchMovieFromSearch = (query) =>
  fetch(
    `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=${query}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host':
          'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
        'x-rapidapi-key': 'c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022',
        useQueryString: true,
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

export const createUserWithEmailAndPassword = (email, password) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

export const loginUserWithEmailandPassword = (email, password) =>
  Firebase.auth().signInWithEmailAndPassword(email, password);

export const fetchUserDatabase = (uid) => db.ref('/users/' + uid);

export const fetchMeetups = () => fetch('http://localhost:3000/api/meetups');
