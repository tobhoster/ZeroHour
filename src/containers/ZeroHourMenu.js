import React, { Component } from 'react';
import {
  Segment,
  Menu,
  Container,
  Image,
  Header,
  Dropdown
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Logo from '../img/zero_hour.png';
import Weather from '../img/weather.png';
import { withRouter } from 'react-router-dom';
import { fetchWeatherConditionUsingGeoLocation } from '../actions/weatherActions';
import { loginState, logOutUser } from '../actions/sessionsActions';

class ZeroHourMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: props.name };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch(fetchWeatherConditionUsingGeoLocation(latitude, longitude));

        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => console.log(err)
    );

    dispatch(loginState()); // Get Login State
  }

  handleItemClick(e, { name }) {
    // this.setState({ activeItem: name });

    this.props.history.push(`/movies`);
  }

  openMovie() {
    this.props.history.push(`/movies`);
  }

  openRestaurants() {
    this.props.history.push(`/restaurants`);
  }

  openLoginPage() {
    this.props.history.push(`/login`);
  }

  openHomepage() {
    this.props.history.push(`/`);
  }

  favorites() {
    this.props.history.push(`/favorites`);
  }

  logOut() {
    const { dispatch } = this.props;

    dispatch(logOutUser());

    this.openHomepage();
  }

  render() {
    const { activeItem } = this.state;
    const { temperature, loggedIn, user } = this.props;
    const { Imperial } = temperature;
    const temperatureValue = Imperial !== undefined ? Imperial.Value : NaN;
    const temperatureUnit = Imperial !== undefined ? Imperial.Unit : 'F';
    const userData = user !== undefined ? user : {};

    return (
      <Container>
        <Segment inverted>
          <Menu
            inverted
            pointing
            secondary
            style={{
              fontSize: '1.2rem'
            }}
          >
            <Menu.Item
              link
              header
              onClick={() => this.openHomepage()}
              style={{
                fontSize: '1.7rem'
              }}
            >
              <Image
                src={Logo}
                style={{
                  width: '22%',
                  marginLeft: '2rem',
                  marginRight: '1rem'
                }}
              />
              Zero Hour
            </Menu.Item>

            <Menu.Menu position="right">
              {/* Movies */}
              <Menu.Item
                link
                name="movies"
                position="right"
                active={activeItem === 'movies'}
                onClick={() => this.openMovie()}
              />

              {/* Resturants */}
              <Menu.Item
                link
                name="restaurants"
                active={activeItem === 'restaurants'}
                onClick={() => this.openRestaurants()}
              />

              {/* Log Out */}
              {loggedIn ? (
                <Menu.Menu position="right">
                  <Dropdown item text={`Hello, ${userData.displayName}`}>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.favorites()}>
                        Favorites
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => this.logOut()}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              ) : (
                <Menu.Item
                  link
                  name="login"
                  active={activeItem === 'login'}
                  onClick={() => this.openLoginPage()}
                />
              )}

              {/* Weather */}
              <Menu.Item
                header
                style={{
                  color: 'white',
                  textColor: 'white',
                  marginRight: '-5rem'
                }}
              >
                <Image
                  src={Weather}
                  size="tiny"
                  style={{
                    width: '20%',
                    marginLeft: '2rem',
                    marginRight: '1rem'
                  }}
                />
                <Header as="h4" inverted>
                  {`${temperatureValue} °${temperatureUnit}`}
                  <Header.Subheader>Temperature</Header.Subheader>
                </Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { fetchWeather, userProfile } = state;
  const { loggedIn, user } = userProfile;

  return {
    temperature: fetchWeather.temperature,
    loggedIn,
    user
  };
}

export default withRouter(connect(mapStateToProps)(ZeroHourMenu));
