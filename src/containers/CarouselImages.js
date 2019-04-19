import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Grid, Image, Modal } from 'semantic-ui-react';
import Carousel from 'nuka-carousel';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class CarouselImages extends Component {
  render() {
    const { images } = this.props;
    return (
      <Container
        style={{
          marginTop: '2rem'
        }}
      >
        <Header as="h2" dividing style={defaultTextColor}>
          <Icon name="images" size="tiny" style={defaultTextColor} /> Images
        </Header>
        <Carousel
          slidesToShow={4}
          autoplay
          swiping
          wrapAround
          zoomScale={0.85}
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
          {images.map((image, index) => (
            <Grid.Column key={index.toString()}>
              <Modal
                trigger={
                  <Image
                    size="big"
                    src={`https://image.tmdb.org/t/p/original/${
                      image.file_path
                    }`}
                  />
                }
              >
                <Image
                  size="massive"
                  src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                  rounded
                />
              </Modal>
            </Grid.Column>
          ))}
        </Carousel>
      </Container>
    );
  }
}

CarouselImages.propTypes = {
  images: PropTypes.array
};

export default CarouselImages;
