import React, { Component } from 'react';
import { Header, Container, Icon, Comment, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class Reviews extends Component {
  render() {
    const { reviews } = this.props;
    const avatars = [
      'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
      'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
      'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
      'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    ];
    const max = reviews.length;

    return (
      <Container
        style={{
          marginTop: '2rem',
          marginBottom: '5rem'
        }}
      >
        <Header
          as="h2"
          dividing
          style={{
            color: 'white',
            textShadow: '2px 2px 8px black',
            marginBottom: '2rem'
          }}
        >
          <Icon name="images" size="tiny" style={defaultTextColor} /> Reviews
        </Header>

        <Segment
          raised
          stacked
          padded
          style={{
            color: '#F9F8F8'
          }}
        >
          <Comment.Group>
            {reviews.map((review, index) => (
              <Comment key={index.toString()}>
                <Comment.Avatar src={avatars[4]} />
                <Comment.Content>
                  <Comment.Author as="a">{review.author}</Comment.Author>
                  <Comment.Text>{review.content}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Segment>
      </Container>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array
};

export default Reviews;
