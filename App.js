import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
} from 'react-native';

import createStore from './src/state/store';
import Home from './src/components/Home';
import StreamingServiceList from './src/components/StreamingServiceList';
import GenreList from './src/components/GenreList';
import MovieList from './src/components/MovieList';
import Search from './src/components/Search';
import Login from './src/components/Login';
import DislikedList from './src/components/DislikedList';
import CreatedRoom from './src/components/CreatedRoom';
import ExperienceSelect from './src/components/ExperienceSelect';
import ModalContainer from './src/components/ModalContainer'
import {
  HOME_SCREEN,
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
  MOVIE_SCREEN,
  SEARCH_MOVIE_SCREEN,
  LOGIN,
  DISLIKED_LIST,
  CREATED_ROOM,
  EXPERIENCE_SELECT
} from './src/constants/ROUTES';

const store = createStore();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name={HOME_SCREEN}
              component={Home}
              options={{ title: 'What 2 Watch' }}
            />
            <Stack.Screen
              name={STREAMING_SERVICES_SCREEN}
              component={StreamingServiceList}
              options={{ title: 'Select Streaming Services' }}
            />
            <Stack.Screen
              name={GENRE_SCREEN}
              component={GenreList}
              options={{ title: 'Select a Genre' }}
            />
            <Stack.Screen
              name={MOVIE_SCREEN}
              component={MovieList}
              options={{ title: 'What 2 Watch' }}
            />
            <Stack.Screen
              name={SEARCH_MOVIE_SCREEN}
              component={Search}
              options={{ title: 'Search Movies' }}
            />
            <Stack.Screen
              name={LOGIN}
              component={Login}
              options={{ title: 'What 2 Watch Login' }}
            />
            <Stack.Screen
              name={DISLIKED_LIST}
              component={DislikedList}
              options={{ title: 'What 2 Watch' }}
            />
            <Stack.Screen
              name={CREATED_ROOM}
              component={CreatedRoom}
              options={{ title: 'Your Room' }}
            />
            <Stack.Screen
              name={EXPERIENCE_SELECT}
              component={ExperienceSelect}
              options={{ title: 'Select Your Experience' }}
            />
          </Stack.Navigator>
          <ModalContainer />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
