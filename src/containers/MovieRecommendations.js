import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Card, Image } from 'semantic-ui-react';
import Carousel from 'nuka-carousel';
import { withRouter } from 'react-router-dom';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class MovieRecommendations extends Component {
  openMovieDetails(title) {
    this.props.history.push(`/${title}/details`);
  }

  render() {
    const { recommendations } = this.props;
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
          <Icon name="content" size="tiny" style={defaultTextColor} />{' '}
          Recommendations
        </Header>
        <Card.Group>
          <Carousel
            slidesToShow={4}
            autoplay
            swiping
            wrapAround
            cellSpacing={15}
            zoomScale={0.85}
          >
            {recommendations.map((recommendation, index) => (
              <Card
                key={index.toString()}
                className="card"
                raised
                onClick={() => this.openMovieDetails(recommendation.id)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${
                    recommendation.poster_path
                  }`}
                />
                <Card.Content>
                  <Card.Header>{recommendation.original_title}</Card.Header>
                  <Card.Description
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                      textOverflow: 'ellipsis',
                      height: '9.4rem'
                    }}
                  >
                    {recommendation.overview}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Carousel>
        </Card.Group>
      </Container>
    );
  }
}

MovieRecommendations.propTypes = {
  recommendations: PropTypes.array
};

export default withRouter(MovieRecommendations);
