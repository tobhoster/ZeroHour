import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import configureStore from './configureStore';
import Home from './components/Home';

import './App.css';
import '../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css';

import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import Restaurants from './components/Restaurants';
import Login from './components/Login';
import Favorites from './components/Favorites';
import UpdateProfile from './components/UpdateProfile';
import { requireAuthenication } from './utils/requireAuthenication';
import RestaurantDetail from './components/RestaurantDetail';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/:movieId/details" component={MovieDetails} />
          <Route path="/movies" component={Movies} />
          <Route path="/restaurants" component={Restaurants} />
          <Route
            path="/restaurant/:restaurantId/details"
            component={RestaurantDetail}
          />
          <Route path="/login" component={Login} />
          <Route
            path="/favorites"
            component={requireAuthenication(Favorites)}
          />
          <Route
            path="/profile"
            component={requireAuthenication(UpdateProfile)}
          />
          {/* Handle Toast on Components */}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </Router>
      </Provider>
    );
  }
}

export default App;
