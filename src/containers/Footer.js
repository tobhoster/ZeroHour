import React, { Component } from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <Segment
        vertical
        style={{ backgroundColor: '#F0EBE5', padding: '5em 0em' }}
      >
        <Container>
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as="h4" content="Services" />
                <List link>
                  <List.Item>
                    <Link to="/">Home</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/movies">Movies</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/restaurants">Restaurants</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/login">Login</Link>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4">Zero Hour</Header>
                <p>
                  Our mission is building a program that gives the option to
                  explore both favorite and trending movies and restaurants at
                  their own convenience.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
