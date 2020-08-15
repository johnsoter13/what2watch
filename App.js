import React from "react";
import { Provider } from "react-redux";

import Index from "./src/components/Index";
import createStore from "./src/state/store";

const store = createStore();

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
