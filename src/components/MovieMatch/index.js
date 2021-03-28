import React from "react";
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";

import * as baseStyles from '../../styles/styles'
import {selectMovieStreamingServicesById} from '../../state/movies/selectors';
import { checkIfMovieIsAvailableToUser } from "../../utils/moviesUtils";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import { selectMatchedMovieId } from "../../state/rooms/selectors";
import MatchAnimationView from '../MatchAnimationView';
import { selectMatchAnimationFinished } from "../../state/animation/selectors";
import { movieListIndexAction } from "../../state/movies/actions";
import { setMatchedMovieIdAction } from "../../state/rooms/actions";
import { setMatchAnimationAction } from "../../state/animation/actions";

const MovieMatch = ({genre}) => {
  const dispatch = useDispatch();
  const matchedMovieId = useSelector(selectMatchedMovieId);
  const movie = useSelector((state) => selectMovieStreamingServicesById(state, matchedMovieId));
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const animationFinished = useSelector(selectMatchAnimationFinished);
  
  const sharedServices = checkIfMovieIsAvailableToUser(userStreamingServices, movie);

  return (
    <View style={styles.container}>
      {animationFinished ? (
        <>
          <View className="match-text-container" style={styles.matchTextContainer}>
            <Text>You have a new match!</Text>
          </View>
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
                <View
                  key={streamingService.display_name}
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
        <TouchableHighlight
          style={styles.continueButton}
          onPress={() => {
            dispatch(movieListIndexAction(genre));
            dispatch(setMatchedMovieIdAction(''));
            dispatch(setMatchAnimationAction(false))
          }}
        >
          <Text style={styles.continueButtonText}>Continue Swiping</Text>
        </TouchableHighlight>
      </>
      ) : (
        <MatchAnimationView moviePicture={movie.moviePicture}/>
      )}
    </View>
  )
};

export default MovieMatch;

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%', 
    padding: 10,
    paddingBottom: 30,
  },
  movieContainer: {
    height: '100%',
    width: '100%',
  },
  movieRowContainer: {
    flex: 1,
    backgroundColor: baseStyles.BUTTON_COLOR,
    padding: 10,
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
  matchTextContainer: {
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  continueButton: {
    margin: 10,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR
  }
});