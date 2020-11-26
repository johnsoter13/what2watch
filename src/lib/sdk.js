export const fetchMovieGenres = () => {
  return fetch("http://localhost:8081/fetchMovieGenres", {
    method: "GET"
  });
};

export const fetchMoviesByGenre = (genre) => {
  return fetch(
    `http://localhost:8081/fetchMoviesByGenre?genre=${genre}`,
    {
      method: "GET",
    }
  );
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
    `http://localhost:8081/fetchMovieFromSearch?query=${query}`,
    {
      method: "GET",
    }
  );
};
