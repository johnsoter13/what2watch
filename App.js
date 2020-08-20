import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import createStore from "./src/state/store";
import Home from "./src/components/Home";
import StreamingServiceList from "./src/components/StreamingServiceList";
import GenreList from "./src/components/GenreList";
import {
  HOME_SCREEN,
  STREAMING_SERVICES_SCREEN,
  GENRE_SCREEN,
} from "./src/constants/ROUTES";

const store = createStore();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={HOME_SCREEN} component={Home} />
          <Stack.Screen
            name={STREAMING_SERVICES_SCREEN}
            component={StreamingServiceList}
          />
          <Stack.Screen name={GENRE_SCREEN} component={GenreList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
