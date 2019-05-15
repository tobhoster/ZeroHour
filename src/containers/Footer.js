import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logOutUser } from '../actions/sessionsActions';

class Footer extends Component {
  logOut(history) {
    const { dispatch } = this.props;

    dispatch(logOutUser());
    history.push(`/`);
  }

  render() {
    const { loggedIn } = this.props;

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
                    {loggedIn ? (
                      <p onClick={() => this.logOut(this.props.history)}>
                        Log Out
                      </p>
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </List.Item>
                </List>
                <p>&#169; {new Date().getFullYear()} Zero Hour </p>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4">Zero Hour</Header>
                <p>
                  The team of Oluwatobi Adebiyi and Efosa Uwa-Omede, tasked with
                  the mission of building a program displays potentially
                  interesting movies while also giving them the option to
                  explore both favorite and new food venues at their
                  convenience. We used technologies such as React.js, Firebase,
                  and LucidChart among others that will allow us to observe and
                  work towards building a program that allows users to explore
                  several types of movie and restaurant services while providing
                  them information based on those services.
                </p>

                <span>Created by Oluwatobi Adebiyi | Efosa Uwa-Omede</span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  const { userProfile } = state;
  const { loggedIn, user } = userProfile;

  return {
    loggedIn,
    user
  };
}

export default connect(mapStateToProps)(Footer);
