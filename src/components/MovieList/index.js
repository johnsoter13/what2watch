import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Title, Text } from "react-native";

import { selectMovieStreamingServicesByGenre } from "../../state/movies/selectors";
import { selectUserStreamingServices } from "../../state/streaming/selectors";

const MovieList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const movieStreamingServices = useSelector((state) =>
    selectMovieStreamingServicesByGenre(
      state,
      route.params.genre,
      userStreamingServices
    )
  );
  console.log(movieStreamingServices);

  return (
    <View>
      {movieStreamingServices?.map((movie) => (
        <>
          <Text>{movie.movieTitle}</Text>
          <View>
            {movie.movieStreamingPlatformsShared.map((streamingService) => (
              <Text>{streamingService.display_name}</Text>
            ))}
          </View>
        </>
      ))}
    </View>
  );
};

export default MovieList;
