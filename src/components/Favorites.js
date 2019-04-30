import React, { Component } from 'react';
import {
  Grid,
  Header,
  Container,
  Segment,
  Item,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';
import { loginState } from '../actions/sessionsActions';

class Favorites extends Component {
  state = { activeItem: 'upcoming' };

  componentDidMount() {
    const { dispatch, history } = this.props;

    dispatch(loginState(history));
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const { activeItem } = this.state;
    // const { loggedIn } = this.props;

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name="login" />
          </Grid.Row>
          <Grid.Row>
            <Container>
              <Segment
                style={{
                  marginBottom: '2rem',
                  marginTop: '2rem'
                }}
              >
                <Header as="h1" dividing>
                  Favorites
                </Header>

                <Item.Group divided>
                  <Item>
                    <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />

                    <Item.Content>
                      <Item.Header as="a">12 Years a Slave</Item.Header>
                      <Item.Meta>
                        <span className="cinema">Union Square 14</span>
                      </Item.Meta>
                      <Item.Description>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </Item.Description>
                      <Item.Extra>
                        <Label>IMAX</Label>
                        <Label icon="globe" content="Additional Languages" />
                      </Item.Extra>
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />

                    <Item.Content>
                      <Item.Header as="a">My Neighbor Totoro</Item.Header>
                      <Item.Meta>
                        <span className="cinema">IFC Cinema</span>
                      </Item.Meta>
                      <Item.Description>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </Item.Description>
                      <Item.Extra>
                        <Button primary floated="right">
                          Buy tickets
                          <Icon name="right chevron" />
                        </Button>
                        <Label>Limited</Label>
                      </Item.Extra>
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Image src="https://react.semantic-ui.com/images/wireframe/image.png" />

                    <Item.Content>
                      <Item.Header as="a">Watchmen</Item.Header>
                      <Item.Meta>
                        <span className="cinema">IFC</span>
                      </Item.Meta>
                      <Item.Description>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                      </Item.Description>
                      <Item.Extra>
                        <Button primary floated="right">
                          Buy tickets
                          <Icon name="right chevron" />
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
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
  const { userProfile } = state;
  const { loggedIn } = userProfile;

  return {
    loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(Favorites));
