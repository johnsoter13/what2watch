import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native'

import { selectMovieGenres } from '../../state/movies/selectors'
import { fetchMoviesByGenreAction } from '../../state/movies/actions'
import { MOVIE_SCREEN } from '../../constants/ROUTES'
import * as baseStyles from '../../styles/styles'

const GenreList = ({ navigation }) => {
  const dispatch = useDispatch()
  const movieGenres = useSelector(selectMovieGenres)

  const handleStreamingServiceSelection = (genre) => {
    // dispatch(
    //   fetchMoviesByGenreAction(
    //     movieGenres[genre].description,
    //     movieGenres[genre].endpoint
    //   )
    // );
    navigation.navigate(MOVIE_SCREEN, { genre })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.genreContainer}>
        {movieGenres.map((genre) => (
          <TouchableOpacity
            style={styles.genreButtonContainer}
            onPress={() => handleStreamingServiceSelection(genre)}
          >
            <Text style={styles.genreButtonText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  genreContainer: {
    width: '100%',
    flex: 1,
  },
  genreButtonContainer: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.BUTTON_COLOR,
    marginBottom: 20,
  },
  genreButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
})

export default GenreList
