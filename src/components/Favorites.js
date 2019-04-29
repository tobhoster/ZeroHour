import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
