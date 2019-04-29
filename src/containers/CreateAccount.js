import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Header, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createUser } from '../actions/sessionsActions';

class CreateAccount extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  createAccount = () => {
    const { dispatch } = this.props;
    const { username, email, password } = this.state;
    console.log('handleSubmit: ', email);

    //eslint-disable-next-line
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);

    if (result === true && password.length > 7) {
      dispatch(createUser(username, email, password));
      this.props.history.push(`/`);
    } else {
      alert('You have entered an invalid email address or Password!');
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { open, close } = this.props;
    return (
      <Modal
        open={open}
        closeOnEscape={true}
        closeOnDimmerClick={true}
        onClose={close}
      >
        <Modal.Header>Create An Account</Modal.Header>
        <Modal.Content>
          <Header as="h4">
            <Header.Subheader>
              Sign in to get favorite movies and restuarants you love.
            </Header.Subheader>
          </Header>
          <Form>
            <Form.Field width={5}>
              <label>Username</label>
              <Form.Input
                placeholder="Username"
                name="username"
                type="text"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field width={5}>
              <label>Email Address</label>
              <Form.Input
                placeholder="Email Address"
                name="email"
                type="email"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field width={5}>
              <label>Password</label>
              <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close} negative>
            Cancel
          </Button>
          <Button
            onClick={this.createAccount}
            positive
            labelPosition="right"
            icon="checkmark"
            content="Create Account"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateAccount.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func
};

function mapStateToProps(state) {
  const { userProfile } = state;
  const { loggedIn } = userProfile;

  return {
    userProfile,
    loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(CreateAccount));
