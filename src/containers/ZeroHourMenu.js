import React, { Component } from 'react';
import { Segment, Menu, Container, Image } from 'semantic-ui-react';

class ZeroHourMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'home' };
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item header>
              <Image avatar src="https://react.semantic-ui.com/logo.png" />
              Zero Hour
            </Menu.Item>

            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="messages"
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Segment>
      </Container>
    );
  }
}

export default ZeroHourMenu;
