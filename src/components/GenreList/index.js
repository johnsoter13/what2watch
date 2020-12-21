import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { selectMovieGenres } from '../../state/movies/selectors';
import { fetchMoviesByGenreAction } from '../../state/movies/actions';
import { MOVIE_SCREEN } from '../../constants/ROUTES';
import * as baseStyles from '../../styles/styles';

const GenreList = ({ navigation }) => {
  const dispatch = useDispatch();
  const movieGenres = useSelector(selectMovieGenres);

  const handleStreamingServiceSelection = (genre) => {
    dispatch(
      fetchMoviesByGenreAction(
        movieGenres[genre].description,
        movieGenres[genre].endpoint
      )
    );
    navigation.navigate(MOVIE_SCREEN, { genre });
  };

  return (
    <View style={styles.container}>
      <View style={styles.genreContainer}>
        {Object.keys(movieGenres).map((genre) => (
          <TouchableOpacity
            style={styles.genreButtonContainer}
            onPress={() => handleStreamingServiceSelection(genre)}
          >
            <Text style={styles.genreButtonText}>
              {movieGenres[genre].description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  genreContainer: {
    overflow: 'auto',
    width: '100%',
    flex: 1,
  },
  genreButtonContainer: {
    height: '35px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.BUTTON_COLOR,
    marginBottom: '20px',
  },
  genreButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
});

export default GenreList;
