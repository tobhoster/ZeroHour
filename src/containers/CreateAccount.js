import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

class CreateAccount extends Component {
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
              <input placeholder="Username" />
            </Form.Field>
            <Form.Field width={5}>
              <label>Email Address</label>
              <input placeholder="Email Address" name="email" type="email" />
            </Form.Field>
            <Form.Field width={5}>
              <label>Password</label>
              <input placeholder="Password" name="password" type="password" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close} negative>
            Cancel
          </Button>
          <Button
            onClick={close}
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

export default CreateAccount;
