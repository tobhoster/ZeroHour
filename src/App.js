import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Home from './components/Home';
import './App.css';
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import Restaurants from './components/Restaurants';

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
        </Router>
      </Provider>
    );
  }
}

export default App;
