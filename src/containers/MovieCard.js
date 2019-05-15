import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Rating, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class MovieCard extends Component {
  openMovieDetails(title) {
    this.props.history.push(`/${title}/details`);
  }

  render() {
    const { movies } = this.props;

    return (
      <Container
        style={{
          background: '#1A1A1C',
          marginBottom: '5rem'
        }}
      >
        <Card.Group
          itemsPerRow={4}
          style={{
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          }}
        >
          {movies.map((movie, index) => (
            <Card
              key={index.toString()}
              className="card"
              raised
              onClick={() => this.openMovieDetails(movie.id)}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <Card.Content>
                <Card.Header>{movie.original_title}</Card.Header>
                <Card.Description
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'normal',
                    textOverflow: 'ellipsis',
                    height: '9.4rem'
                  }}
                >
                  {movie.overview}
                </Card.Description>
              </Card.Content>

              <Rating
                style={{
                  marginTop: '1rem',
                  marginBottom: '1.2rem',
                  color: '#41d99e'
                }}
                disabled
                rating={movie.vote_average / 2}
                maxRating={5}
                icon="star"
                size="tiny"
              />
            </Card>
          ))}
        </Card.Group>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movies: PropTypes.array
};

export default withRouter(MovieCard);
