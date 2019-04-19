import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Card, Image } from 'semantic-ui-react';
import Carousel from 'nuka-carousel';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class CarouselMovieCredits extends Component {
  render() {
    const { credits, title, icon } = this.props;

    return (
      <Container
        style={{
          marginTop: '2rem',
          marginBottom: '2rem'
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
          <Icon name={icon} size="tiny" style={defaultTextColor} /> {title}
        </Header>
        <Card.Group>
          <Carousel
            slidesToShow={6}
            autoplay
            swiping
            wrapAround
            withoutControls
            cellSpacing={15}
            zoomScale={0.85}
          >
            {credits.map((credit, index) => (
              <Card key={index.toString()} className="card" raised>
                <Image
                  fluid
                  src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                />
                <Card.Content>
                  <Card.Header>{credit.character}</Card.Header>
                  <Card.Description>{credit.name}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Carousel>
        </Card.Group>
      </Container>
    );
  }
}

CarouselMovieCredits.propTypes = {
  credits: PropTypes.array,
  title: PropTypes.string,
  icon: PropTypes.string
};

export default CarouselMovieCredits;
