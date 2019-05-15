import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Grid, Embed } from 'semantic-ui-react';
import Carousel from 'nuka-carousel';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class CarouselVideos extends Component {
  render() {
    const { videos, images, max } = this.props;

    return (
      <Container
        style={{
          marginTop: '2rem'
        }}
      >
        <Header as="h2" dividing style={defaultTextColor}>
          <Icon name="film" size="tiny" style={defaultTextColor} /> Videos
        </Header>

        <Carousel
          autoplay
          wrapAround
          pauseOnHover
          renderCenterLeftControls={({ previousSlide }) => (
            <Icon
              color="grey"
              onClick={previousSlide}
              name="angle double left"
              size="huge"
            />
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Icon
              color="grey"
              onClick={nextSlide}
              name="angle double right"
              size="huge"
            />
          )}
        >
          {videos.map((video, index) => (
            <Grid.Column key={index.toString()}>
              <Embed
                id={`${video.key}`}
                hd
                aspectRatio="16:9"
                placeholder={`https://image.tmdb.org/t/p/original/${
                  images[Math.floor(Math.random() * (max - 0)) + 0].file_path
                }`}
                source="youtube"
              />
            </Grid.Column>
          ))}
        </Carousel>
      </Container>
    );
  }
}

CarouselVideos.propTypes = {
  videos: PropTypes.array,
  images: PropTypes.array,
  max: PropTypes.number
};

export default CarouselVideos;
