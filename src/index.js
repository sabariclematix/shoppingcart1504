import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import cartReducer from "./components/reducers/cartReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { watchAgeUp } from "./services/productService";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(cartReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAgeUp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
