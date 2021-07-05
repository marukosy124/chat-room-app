import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./js/routes/PrivateRoute";
import LoginPage from "./js/views/LoginPage";
import ChatPage from "./js/views/ChatPage";
import configureStore from "./js/store";
import { history } from "./js/store/history";
import "./scss/main.scss";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={ChatPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
