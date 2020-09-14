import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Title, Text } from "react-native";

import { selectMovieStreamingServicesByGenre } from "../../state/movies/selectors";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import MovieListItem from "../MovieListItem";

const MovieList = ({ navigation, route }) => {
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const movieStreamingServices = useSelector((state) =>
    selectMovieStreamingServicesByGenre(
      state,
      route.params.genre,
      userStreamingServices
    )
  );

  return (
    <View>
      {movieStreamingServices?.map((movie) => (
        <MovieListItem movie={movie} />
      ))}
    </View>
  );
};

export default MovieList;
