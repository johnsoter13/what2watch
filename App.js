import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import createStore from './src/state/store';
import Home from './src/components/Home';
import StreamingServiceList from './src/components/StreamingServiceList';
import GenreList from './src/components/GenreList';
import MovieList from './src/components/MovieList';
import Search from './src/components/Search';
import Login from './src/components/Login';
import DislikedList from './src/components/DislikedList';
import {
  HOME_SCREEN,
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
  MOVIE_SCREEN,
  SEARCH_MOVIE_SCREEN,
  LOGIN,
  DISLIKED_LIST,
} from './src/constants/ROUTES';
import { setUseProxies } from 'immer';

const store = createStore();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
            options={{ title: 'Select Genres' }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
