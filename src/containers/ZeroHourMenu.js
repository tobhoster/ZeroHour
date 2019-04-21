import React, { Component } from 'react';
import { Segment, Menu, Container, Image, Input } from 'semantic-ui-react';
import Logo from '../zero_hour.png';
import Weather from '../weather.png';
import { withRouter } from 'react-router-dom';

class ZeroHourMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: props.name };
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  openHomepage() {
    this.props.history.push(`/`);
  }

  render() {
    const { activeItem } = this.state;

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
                onClick={this.handleItemClick}
              />

              {/* Resturants */}
              <Menu.Item
                name="restaurants"
                active={activeItem === 'restaurants'}
                onClick={this.handleItemClick}
              />

              {/* Log Out */}
              <Menu.Item
                name="log in"
                active={activeItem === 'log in'}
                onClick={this.handleItemClick}
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
                {`58 °F`}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(ZeroHourMenu);
