import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button } from "react-native";

import { selectMovieGenres } from "../../state/movies/selectors";
import { fetchMoviesByGenreAction } from "../../state/movies/actions";
import { MOVIE_SCREEN } from "../../constants/ROUTES";

const GenreList = ({ navigation }) => {
  const dispatch = useDispatch();
  const movieGenres = useSelector(selectMovieGenres);

  const handleStreamingServiceSelection = (genre) => {
    dispatch(fetchMoviesByGenreAction(movieGenres[genre].description, movieGenres[genre].endpoint));
    navigation.navigate(MOVIE_SCREEN, { genre });
  };

  return (
    <View>
      {Object.keys(movieGenres).map((genre) => (
        <View key={genre}>
          <Button
            title={movieGenres[genre].description}
            onPress={() => handleStreamingServiceSelection(genre)}
          />
        </View>
      ))}
    </View>
  );
};

export default GenreList;
