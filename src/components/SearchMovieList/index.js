import React from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'

import {
  selectSearchResults,
  selectSearchStatus,
} from '../../state/search/selectors'
import MovieListItem from '../MovieListItem'
import { PENDING } from '../../state/constants'

const SearchMovieList = ({ query }) => {
  const searchMovies = useSelector((state) => selectSearchResults(state, query))

  const moviesFromSearchLoadingStatus = useSelector(selectSearchStatus)

  return (
    <View style={styles.container}>
      {moviesFromSearchLoadingStatus === PENDING ? (
        <ActivityIndicator size='large' />
      ) : (
        <ScrollView style={styles.scrollView}>
          {searchMovies?.map((movie) => (
            <View key={movie.movieId} style={styles.movieContainer}>
              <MovieListItem movie={movie} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  movieContainer: {
    marginBottom: 20,
    height: 600,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
})

export default SearchMovieList
