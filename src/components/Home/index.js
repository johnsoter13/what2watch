import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Button, TouchableOpacity, Text, ImageBackground } from 'react-native';

import * as baseStyles from '../../styles/styles';
import {
  fetchMovieGenresAction,
  fetchMeetupsAction,
} from '../../state/movies/actions';
import {
  STREAMING_SERVICES_SCREEN,
  SEARCH_MOVIE_SCREEN,
  LOGIN,
  DISLIKED_LIST,
  CREATED_ROOM,
  EXPERIENCE_SELECT
} from '../../constants/ROUTES';
import { selectUserIsLoggedIn } from '../../state/auth/selectors';
import { logUserOutAction } from '../../state/auth/actions';
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn);

  // logs user out
  const logOut = () => {
    dispatch(logUserOutAction());
  };

  useEffect(() => {
    dispatch(fetchMovieGenresAction());
  }, []);

  return (
    <View style={styles.container}>
      {/* TODO: Move into header component and make icon */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate(SEARCH_MOVIE_SCREEN)}
        >
          <Text style={styles.searchButtonText}>
            Already have a movie in mind?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsButtonContainer}>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => navigation.navigate(EXPERIENCE_SELECT)}
          >
            <View style={styles.imageContainer}>
              <ImageBackground style={styles.movieImage} source={require('../../../assets/find-movie.jpg')} >
                <View>
                  <Text style={styles.movieImageText}>
                    Find a Movie!
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => navigation.navigate(CREATED_ROOM)}
          >
            <Text style={styles.actionsText}>Create a Room</Text>
          </TouchableOpacity>
        </View> */}
        <View>
          {/* <View style={styles.actionButton}>
            <Button
              onPress={() => {
                isUserLoggedIn ? logOut() : navigation.navigate(LOGIN);
              }}
              title={isUserLoggedIn ? 'Logout' : 'Login'}
            />
          </View>
          <View style={styles.actionButton}>
            <Button
              onPress={() => navigation.navigate(DISLIKED_LIST)}
              title='Disliked List'
            />
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 20,

  },
  searchContainer: {
    width: '100%',
    height: '5%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  actionsContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,

  },
  actionsButtonContainer: {
    width: '100%',
    height: '75%',
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: baseStyles.BUTTON_COLOR
  },
  actionsButton: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.BUTTON_COLOR,
  },
  actionsText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
    fontSize: 28,
  },
  searchButton: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
  },
  searchButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  movieImage: {
    width: '100%',
    height: '100%',

  },
  movieImageText: {
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 100
  }
});

export default Home;
