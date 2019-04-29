import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Container, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';
import {
  discoverResturants,
  searchResturants
} from '../actions/restaurantsActions';
import { fetchWeatherConditionUsingGeoLocation } from '../actions/weatherActions';
import RestaurantCard from '../containers/RestaurantCard';

class Restaurants extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'discover', searchDisabled: true, search: '' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSearchChange = (e, { type }) => {
    const { dispatch, geopostion } = this.props;
    this.setState({
      search: e.target.value,
      searchDisabled: false,
      activeItem: 'results'
    });

    if (this.state.search && this.state.search.length > 1) {
      if (this.state.search.length % 2 === 0) {
        dispatch(
          searchResturants(
            this.state.search,
            geopostion.latitude,
            geopostion.longitude
          )
        );
      }
    }
    console.log('Movies - handleSearchChange: ', e.target.value);
  };

  switchTabs(activeItem, result) {
    const { restaurants, searched } = result;

    switch (activeItem) {
      case 'discover':
        return <RestaurantCard restaurants={restaurants} />;
      case 'results':
        return <RestaurantCard restaurants={searched} />;
      default:
        return <RestaurantCard restaurants={restaurants} />;
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch(fetchWeatherConditionUsingGeoLocation(latitude, longitude));
        dispatch(discoverResturants(latitude, longitude));

        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => console.log(err)
    );
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name="restaurants" />
            {/* Tab */}
            <Container>
              <Menu tabular inverted>
                <Menu.Item
                  name="discover"
                  active={activeItem === 'discover'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="results"
                  disabled={this.state.searchDisabled}
                  active={activeItem === 'results'}
                  onClick={this.handleItemClick}
                />
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input
                      transparent
                      inverted
                      icon={{ name: 'search', link: true }}
                      placeholder="Search Restautants..."
                      type={this.state.search}
                      onChange={this.handleSearchChange}
                    />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              {this.switchTabs(activeItem, this.props)}
            </Container>
          </Grid.Row>
        </Grid>
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fetchWeather, fetchRestaurants } = state;

  const { geopostion } = fetchWeather;
  const { text, searched, restaurants, details, reviews } = fetchRestaurants;

  return { geopostion, searched, text, restaurants, details, reviews };
}

export default withRouter(connect(mapStateToProps)(Restaurants));
