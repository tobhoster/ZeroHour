import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Label } from 'semantic-ui-react';
import trimText from '../utils/trimText';

export default class ReadMoreReact extends React.Component {
  constructor(props) {
    super(props);

    let args = [
      this.props.text,
      this.props.min,
      this.props.ideal,
      this.props.max
    ];

    const [primaryText, secondaryText] = trimText(...args);
    this.state = {
      displaySecondary: false,
      primaryText,
      secondaryText,
      readMoreText: this.props.readMoreText
    };
  }

  setStatus() {
    let display = !this.state.displaySecondary;
    this.setState({ displaySecondary: display });
  }

  render() {
    let displayText;
    if (!this.state.secondaryText) {
      displayText = (
        <Comment.Text>
          <span className="displayed-text">
            {`${this.state.primaryText} ${this.state.secondaryText}`}
          </span>
        </Comment.Text>
      );
    } else if (this.state.displaySecondary) {
      displayText = (
        <Comment.Text>
          <span className="displayed-text" onClick={this.setStatus.bind(this)}>
            {`${this.state.primaryText} ${this.state.secondaryText}`}
          </span>
        </Comment.Text>
      );
    } else {
      displayText = (
        <Comment.Text>
          <span className="displayed-text">
            {this.state.primaryText}
            <span style={{ display: 'none' }}>{this.state.secondaryText}</span>
            <Label
              as="a"
              basic
              size="small"
              style={{
                marginLeft: '0.2rem',
                marginTop: '0.2rem'
              }}
              //   className="read-more-button"
              onClick={this.setStatus.bind(this)}
            >
              {this.state.readMoreText}
            </Label>
          </span>
        </Comment.Text>
      );
    }

    return displayText;
  }
}

ReadMoreReact.propTypes = {
  text: PropTypes.string.isRequired,
  min: PropTypes.number,
  ideal: PropTypes.number,
  max: PropTypes.number,
  readMoreText: PropTypes.string
};

ReadMoreReact.defaultProps = {
  readMoreText: 'read more'
};
