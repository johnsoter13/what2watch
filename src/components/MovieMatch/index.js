import React from "react";
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
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
import MovieInfoSection from "../MovieInfoSection";
import Loading from "../Loading";

const MovieMatch = ({genre}) => {
  const dispatch = useDispatch();
  const matchedMovieId = useSelector(selectMatchedMovieId);
  const movie = useSelector((state) => selectMovieStreamingServicesById(state, matchedMovieId));
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const animationFinished = useSelector(selectMatchAnimationFinished);
  
  const sharedServices = movie && checkIfMovieIsAvailableToUser(userStreamingServices, movie);

  const renderMatch = () => (
    <View style={styles.container}>
      {animationFinished ? (
        <>
          <View className="match-text-container" style={styles.matchTextContainer}>
            <Text>You have a new match!</Text>
            <Text>{movie.movieTitle}</Text>
          </View>
          <View style={styles.movieRowContainer}>
            <MovieInfoSection movie={movie} sharedServices={sharedServices} />
          </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            dispatch(movieListIndexAction(genre));
            dispatch(setMatchedMovieIdAction(''));
            dispatch(setMatchAnimationAction(false))
          }}
        >
          <Text style={styles.continueButtonText}>Continue Swiping</Text>
        </TouchableOpacity>
      </>
      ) : (
        <MatchAnimationView moviePicture={movie.moviePicture}/>
      )}
    </View>
  );

  return movie ? renderMatch() : <Loading />
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