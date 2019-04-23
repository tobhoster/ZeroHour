import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Header, Form } from 'semantic-ui-react';

class ForgotPassword extends Component {
  render() {
    const { open, close } = this.props;
    return (
      <Modal
        open={open}
        closeOnEscape={true}
        closeOnDimmerClick={true}
        onClose={close}
      >
        <Modal.Header>Forgot Your Password?</Modal.Header>
        <Modal.Content>
          <Header as="h5">
            <Header.Subheader>
              Don't worry. Resetting your password is easy, just tell us the
              email address you registered with Zero Hour.
            </Header.Subheader>
          </Header>
          <Form>
            <Form.Field width="5">
              <input placeholder="Email Address" />
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
            content="Send"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ForgotPassword.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func
};

export default ForgotPassword;
