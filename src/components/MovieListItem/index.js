import React from 'react';
import { View, Button, Linking, Text, StyleSheet, Image } from 'react-native';

const MovieListItem = ({ movie }) => {
  const handleNavigateToLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  return (
    <View style={styles.movieContainer}>
      <Text style={styles.movieTitle}>{movie.name || movie.movieTitle}</Text>
      <View style={styles.movieBodyContainer}>
        <View style={styles.movieRowContainer}>
          <Text style={styles.movieRowAvailable}>Available on:</Text>
          <View>
            {movie.locations.map((streamingService) => (
              <View style={styles.movieStreamingService}>
                <Button
                  onPress={() => handleNavigateToLink(streamingService.url)}
                  title={streamingService.display_name}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.movieRowContainer}>
          <Image style={styles.movieImage} source={{ uri: movie.picture }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '85%',
    minHeight: 200,
    overflow: 'auto',
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  movieRowContainer: {
    width: '50%',
    flex: 1,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 20,
    width: '100%',
    marginBottom: 5,
  },
  movieRowAvailable: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
});

export default MovieListItem;
