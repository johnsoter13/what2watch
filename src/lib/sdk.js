import Firebase, { db } from '../../config/Firebase';

export const fetchMovieGenres = () =>
  fetch('http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMovieGenres', {
    method: 'GET',
  });

export const fetchMovieDetails = (movieId) =>
  fetch(
    `http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMovieDetails?tconst=${movieId}&currentCountry=US`,
    {
      method: 'GET',
    }
  );

export const fetchMoviesByGenre = (genre) =>
  fetch(
    `http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMoviesByGenre?genre=${genre}`,
    {
      method: 'GET',
    }
  );

export const fetchMovieStreamingServices = (movieId) =>
  fetch(
    `http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMovieStreamingServices?country=us&source_id=${movieId}&source=imdb`,
    {
      method: 'GET',
    }
  );

export const fetchMovieFromSearch = (query) =>
  fetch(
    `http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMovieFromSearch?country=us&term=${query}`,
    {
      method: 'GET',
    }
  );

  export const fetchMostPopularMovies = () =>
  fetch(
    `http://ec2-18-221-43-33.us-east-2.compute.amazonaws.com:3000/fetchMostPopularMovies`,
    {
      method: 'GET',
    }
  );

export const createUserWithEmailAndPassword = (email, password) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password);

export const loginUserWithEmailandPassword = (email, password) =>
  Firebase.auth().signInWithEmailAndPassword(email, password);

export const fetchUserDatabase = (uid) => db.ref('/users/' + uid);

export const fetchRoomsDatabase = (rid) => db.ref('/rooms/' + rid);
