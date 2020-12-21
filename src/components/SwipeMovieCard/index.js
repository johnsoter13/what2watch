import React from 'react';
import { StyleSheet, View, Button, Text, Image, Linking } from 'react-native';

const SwipeMovieCard = ({ movie, sharedServices }) => {
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
    <>
      <Text style={styles.movieTitle}>{movie.movieTitle}</Text>
      <View style={styles.movieBodyContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.movieImage} source={{ uri: movie.picture }} />
        </View>
        <View style={styles.movieRowContainer}>
          <Text style={styles.movieRowAvailable}>Available on:</Text>
          <View style={styles.movieStreamingServices}>
            {sharedServices.map((streamingService) => (
              <View key={streamingService} style={styles.movieStreamingService}>
                <Button
                  onPress={() => handleNavigateToLink(streamingService.url)}
                  title={streamingService.display_name}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  movieBodyContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  movieRowContainer: {
    flex: 1,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 20,
    width: '100%',
    marginBottom: 5,
    height: '5%',
  },
  movieRowAvailable: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  movieStreamingServices: {
    flex: 1,
    overflow: 'auto',
  },
});

export default SwipeMovieCard;
