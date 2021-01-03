import React, { useState } from 'react';
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const MovieListItem = ({ movie }) => {
  const [moreInfoToggle, setMoreInfoToggle] = useState(false);
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
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{movie.movieTitle}</Text>
        <TouchableOpacity onPress={() => setMoreInfoToggle(!moreInfoToggle)}>
          <Image
            style={styles.infoIcon}
            source={require('../../../assets/info.png')}
          />
        </TouchableOpacity>
      </View>
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
              {movie.movieStreamServices.map((streamingService) => (
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
            <Image
              style={styles.movieImage}
              source={{ uri: movie.moviePicture }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    minHeight: '600px',
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#888888',
    borderRadius: 10,
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
    width: '50%',
    flex: 1,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
    width: '90%',
  },
  movieRowAvailable: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  movieRowContainer: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  imdbIcon: {
    height: 32,
    width: 32,
    marginRight: 5,
  },
  infoIcon: {
    height: 24,
    width: 24,
    marginTop: 2,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  movieStreamingServices: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MovieListItem;
