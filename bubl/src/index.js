import React from "react";
import ReactDOM from "react-dom";
// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
// middleware
import thunk from "redux-thunk";
import logger from "redux-logger";
// components
import App from "./App";

import "./CSS/index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
