import Firebase from "../../config/Firebase";

export const fetchMovieGenres = () => {
  return fetch("https://imdb8.p.rapidapi.com/title/list-popular-genres", {
    method: "GET",
    headers: {	
      "x-rapidapi-host": "imdb8.p.rapidapi.com",	
      "x-rapidapi-key": "c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022",	
      useQueryString: true,	
      "Content-Type": "application/json; charset=utf-8",	
    },	
  });	  
};

export const fetchMoviesByGenre = (genre) => {
  return fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=${genre}`, {
      method: "GET",
      headers: {	
        "x-rapidapi-host": "imdb8.p.rapidapi.com",	
        "x-rapidapi-key": "c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022",	
        useQueryString: true,	
        "Content-Type": "application/json; charset=utf-8",	
      },
    });
};

export const fetchMovieStreamingServices = (movieId) => {
  return fetch(
    `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=us&source_id=${movieId}&source=imdb`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022",
        useQueryString: true,
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
};

export const fetchMovieFromSearch = (query) => {
  return fetch(
    `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=${query}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "c50c4c9db7mshcf4126835ef9018p19fd07jsn885511f89022",
        useQueryString: true,
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
};

export const createUserWithEmailAndPassword = (email, password) =>
  Firebase.auth().createUserWithEmailAndPassword(email, password)

export const loginUserWithEmailandPassword = (email, password) => 
  Firebase.auth().signInWithEmailAndPassword(email, password)