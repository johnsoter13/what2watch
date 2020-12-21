import React from 'react';
import { StyleSheet, View, Button, Text, Image, Linking } from 'react-native';

const SwipeMovieCard = ({ moreInfoToggle, movie, sharedServices }) => {
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
        {moreInfoToggle ? (
          <View style={styles.movieRowContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.ratingContainer}>
                <Image
                  style={styles.imdbIcon}
                  source={require('../../../assets/imdb.png')}
                />
                <Text>Rating: {movie.movieRating}/10</Text>
              </View>
              <View>
                <Text>Release Date: {movie.movieReleaseDate}</Text>
                <Text>Run Time: {movie.movieRunningTime} Minutes</Text>
              </View>
            </View>
            <View>
              <Text>{movie.moviePlot}</Text>
            </View>
            <Text style={styles.movieRowAvailable}>Available on:</Text>
            <View style={styles.movieStreamingServices}>
              {sharedServices.map((streamingService) => (
                <View
                  key={streamingService}
                  style={styles.movieStreamingService}
                >
                  <Button
                    onPress={() => handleNavigateToLink(streamingService.url)}
                    title={streamingService.display_name}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image style={styles.movieImage} source={{ uri: movie.picture }} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  movieBodyContainer: {
    flex: 1,
    padding: '10px',
    overflow: 'auto',
    backgroundColor: '#888888',
    borderRadius: '10px',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
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
    marginTop: '20px',
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  movieStreamingServices: {
    flex: 1,
    overflow: 'auto',
  },
  imdbIcon: {
    height: '32px',
    width: '32px',
    marginRight: '5px',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: '50px',
  },
});

export default SwipeMovieCard;
