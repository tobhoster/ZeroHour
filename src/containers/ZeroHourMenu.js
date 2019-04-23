import React, { Component } from 'react';
import { Segment, Menu, Container, Image, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Logo from '../zero_hour.png';
import Weather from '../weather.png';
import { withRouter } from 'react-router-dom';
import { fetchWeatherConditionUsingGeoLocation } from '../actions/weatherActions';

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

        console.log('componentWillMount: ', this.state);
      },
      err => console.log(err)
    );
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

  render() {
    const { activeItem } = this.state;
    const { temperature } = this.props;
    const { Imperial } = temperature;
    const temperatureValue = Imperial !== undefined ? Imperial.Value : NaN;
    const temperatureUnit = Imperial !== undefined ? Imperial.Unit : 'F';

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
                name="movies"
                position="right"
                active={activeItem === 'movies'}
                onClick={() => this.openMovie()}
              />

              {/* Resturants */}
              <Menu.Item
                name="restaurants"
                active={activeItem === 'restaurants'}
                onClick={() => this.openRestaurants()}
              />

              {/* Log Out */}
              <Menu.Item
                name="login"
                active={activeItem === 'login'}
                onClick={() => this.openLoginPage()}
              />

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
                  <Header.Subheader>
                    Temperature <br /> <i>Syosset</i>
                  </Header.Subheader>
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
  const { fetchWeather } = state;

  return {
    temperature: fetchWeather.temperature
  };
}

export default withRouter(connect(mapStateToProps)(ZeroHourMenu));
