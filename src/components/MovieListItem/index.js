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

import * as baseStyles from '../../styles/styles';

const MovieListItem = ({ movie, swipeCard, sharedServices }) => {
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

  const movieStreamingServices = swipeCard ? sharedServices : movie.movieStreamServices;

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
      <View style={moreInfoToggle ? styles.moreInfoBodyContainer : styles.movieBodyContainer}>
        {moreInfoToggle ? (
          <View style={styles.movieRowContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.ratingContainer}>
                <Image
                  style={styles.imdbIcon}
                  source={require('../../../assets/imdb.png')}
                />
                <Text style={styles.text}>Rating: {movie.movieRating}/10</Text>
              </View>
              <View>
                <Text style={styles.text}>Release Date: {movie.movieReleaseDate}</Text>
                <Text style={styles.text}>Run Time: {movie.movieRunningTime} Minutes</Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>{movie.moviePlot}</Text>
            </View>
            <Text style={styles.movieRowAvailable}>Available on:</Text>
            <View style={styles.movieStreamingServices}>
              {movieStreamingServices.map((streamingService) => (
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
    width: '100%',
    minHeight: '600px',
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: 10,
  },
  moreInfoBodyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: baseStyles.BUTTON_COLOR,
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
    color: baseStyles.BUTTON_TEXT_COLOR,
    marginTop: 30
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
  text: {
    color: baseStyles.BUTTON_TEXT_COLOR
  }
});

export default MovieListItem;
