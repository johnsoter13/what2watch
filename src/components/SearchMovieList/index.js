import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { selectSearchResults } from '../../state/search/selectors';
import MovieListItem from '../MovieListItem';

const SearchMovieList = ({ query }) => {
  const searchMovies = useSelector((state) => selectSearchResults(state, query));

  return (
    <View style={styles.container}>
      {searchMovies?.map((movie) => (
        <MovieListItem movie={movie} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
});

export default SearchMovieList;
