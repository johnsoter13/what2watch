import React from "react";
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

import * as baseStyles from '../../styles/styles'

const MovieInfoSection = ({sharedServices, movie}) => {
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
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.imdbIcon}
            source={require('../../../assets/imdb.png')}
          />
          <Text style={styles.text}>Rating: {movie.movieRating}/10</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Release Date: {movie.movieReleaseDate}
          </Text>
          <Text style={styles.text}>
            Run Time: {movie.movieRunningTime} Minutes
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>{movie.moviePlot}</Text>
      </View>
      <Text style={styles.movieRowAvailable}>Available on:</Text>
      <View style={styles.movieStreamingServices}>
        {sharedServices.map((streamingService) => (
          <TouchableOpacity
            style={styles.streamingServiceButton}
            key={streamingService.display_name}
            className="streaming-service-button"
            onPress={() => handleNavigateToLink(streamingService.url)}
            title={streamingService.display_name}
          >
            <Text style={styles.StreamingServiceButtonText} className="streaming-service-button--text">{streamingService.display_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  text: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
  movieRowAvailable: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
    color: baseStyles.BUTTON_TEXT_COLOR,
    marginTop: 30,
  },
  movieStreamingService: {
    marginBottom: 5,
  },
  streamingServiceButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: baseStyles.BUTTON_TEXT_COLOR,
    borderRadius: 4,
  },
  StreamingServiceButtonText: {
    alignSelf: 'center',
    color: baseStyles.BUTTON_COLOR,
  },
});

export default MovieInfoSection;