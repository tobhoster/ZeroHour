import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid,
  Image,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';
import CreateAccount from '../containers/CreateAccount';
import ForgotPassword from '../containers/ForgotPassword';
import {
  loginState,
  loginUser,
  loginGoogle,
  loginFacebook,
  loginTwitter,
  logOutUser
} from '../actions/sessionsActions';

const buttonStyle = {
  marginTop: '1rem'
};

class Login extends Component {
  state = {
    activeItem: 'upcoming',
    createAnAccount: false,
    iForgotPassword: false,
    email: '',
    password: ''
  };

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  createAccount = () => {
    this.setState({ createAnAccount: true });
  };

  closeCreateAccount = () => {
    this.setState({ createAnAccount: false });
  };

  forgotPassword = () => {
    this.setState({ iForgotPassword: true });
  };

  closeForgotPassword = () => {
    this.setState({ iForgotPassword: false });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleEmailLogin = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    console.log('handleSubmit: ', email);

    dispatch(loginUser(email, password));
    this.props.history.push(`/`);
  };

  handleGoogleLogin = () => {
    const { dispatch } = this.props;

    dispatch(loginGoogle());
    this.props.history.push(`/`);
  };

  render() {
    const {
      activeItem,
      createAnAccount,
      iForgotPassword,
      loggedIn
    } = this.state;

    return (
      <div>
        <Grid
          centered
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name={loggedIn ? 'logout' : 'login'} />
          </Grid.Row>
          <Grid.Column width={6}>
            <Form
              size="large"
              widths="equal"
              style={{
                marginTop: '7.5rem',
                marginBottom: '7.5rem'
              }}
            >
              <Segment
                stacked
                inverted
                style={{
                  background: '#1a1a1c'
                }}
              >
                <Header as="h1" inverted>
                  Welcome Back
                  <Header.Subheader>
                    Sign in to get favorite movies and restuarants you love.
                  </Header.Subheader>
                </Header>
                <Form.Input
                  // onChange={(e, data) => this.setState({ email: data.value })}
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon="user"
                  iconPosition="left"
                  onChange={this.handleChange}
                />
                <Form.Input
                  // onChange={(e, data) => this.setState({ password: data.value })}
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon="lock"
                  iconPosition="left"
                  onChange={this.handleChange}
                />
                <Button type="submit" fluid onClick={this.handleEmailLogin}>
                  Login
                </Button>
                <Button color="facebook" fluid style={buttonStyle}>
                  <Icon name="facebook" /> Sign in with Facebook
                </Button>
                <Button color="twitter" fluid style={buttonStyle}>
                  <Icon name="twitter" /> Sign in with Twitter
                </Button>
                <Button
                  color="google plus"
                  fluid
                  style={buttonStyle}
                  onClick={this.handleGoogleLogin}
                >
                  <Icon name="google" /> Sign in with Google
                </Button>
                <Header
                  as="h5"
                  floated="left"
                  style={buttonStyle}
                  onClick={this.createAccount}
                >
                  <i
                    style={{
                      color: 'grey'
                    }}
                  >
                    Don't have the account?
                  </i>
                  <br /> Create an Account
                </Header>
                <Header
                  as="h5"
                  floated="right"
                  style={buttonStyle}
                  onClick={this.forgotPassword}
                >
                  Forgot Password?
                </Header>
              </Segment>
            </Form>
          </Grid.Column>
          <CreateAccount
            open={createAnAccount}
            close={this.closeCreateAccount}
          />
          <ForgotPassword
            open={iForgotPassword}
            close={this.closeForgotPassword}
          />
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
    userProfile,
    loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(Login));
