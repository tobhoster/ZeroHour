import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';

class UpdateProfile extends Component {
  state = { activeItem: 'upcoming' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const { activeItem, loggedIn } = this.state;

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

export default withRouter(UpdateProfile);
