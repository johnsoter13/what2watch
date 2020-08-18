import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import createStore from "./src/state/store";
import Home from "./src/components/Home";
import StreamingServiceList from "./src/components/StreamingServiceList";

const store = createStore();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="StreamingServiceList"
            component={StreamingServiceList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
