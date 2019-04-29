import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid,
  Container,
  Image,
  List,
  Segment,
  Header,
  Icon,
  Modal,
  Comment,
  Button
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Carousel from 'nuka-carousel';
import ReadMore from '../utils/ReadMore';
import Footer from '../containers/Footer';
import {
  getResturantDetails,
  getResturantReviews
} from '../actions/restaurantsActions';
import {
  getFavorite,
  deleteFavorite,
  addFavorite
} from '../actions/favoritesActions';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class RestaurantDetail extends Component {
  componentDidUpdate(prevProps) {
    ReactDOM.findDOMNode(this).scrollIntoView();
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      window.location.reload();
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    console.log('RestaurantDetail - match: ', match);
    dispatch(getResturantDetails(params.restaurantId));
    dispatch(getResturantReviews(params.restaurantId));
    dispatch(getFavorite(params.restaurantId));
  }

  toggleFavorite(favorite) {
    const { dispatch, match } = this.props;
    const { params } = match;

    favorite.status
      ? dispatch(deleteFavorite(params.restaurantId))
      : dispatch(
          addFavorite(params.restaurantId, 'restaurant', this.props.history)
        );
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const { activeItem } = this.state;
    const { details, reviews, favorite } = this.props;
    const detailsData = details === undefined ? {} : details;
    const displayAddress =
      details.location === undefined ? [] : details.location.display_address;
    const categories =
      detailsData.categories === undefined ? [] : detailsData.categories;
    const images = detailsData.photos === undefined ? [] : detailsData.photos;
    // const hours = details.hours === undefined ? [] : details.hours[0].open;
    // const reviewsData = reviews === undefined ? [] : reviews;
    console.log('detailsData: ', detailsData);

    if (favorite.updated) {
      window.location.reload();
    }

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name="restaurants" />
          </Grid.Row>
        </Grid>
        <Container
          style={{
            marginTop: '2rem'
          }}
        >
          <Header as="h1" dividing style={defaultTextColor}>
            {detailsData.name}
          </Header>

          {favorite.status ? (
            <Button
              inverted
              floated="right"
              size="medium"
              onClick={() => this.toggleFavorite(favorite)}
            >
              <Icon circular name="favorite" /> Added
            </Button>
          ) : (
            <Button
              inverted
              floated="right"
              size="medium"
              onClick={() => this.toggleFavorite(favorite)}
            >
              <Icon circular name="add" /> Add to Favorite
            </Button>
          )}

          <Header as="h2" dividing style={defaultTextColor}>
            <Icon name="folder outline" size="tiny" style={defaultTextColor} />{' '}
            Overview
          </Header>
          <Grid>
            {/* Left */}
            <Grid.Column floated="left" width={10}>
              <Segment
                raised
                stacked
                style={{
                  color: '#F9F8F8'
                }}
              >
                {/* Name */}
                <Header as="h5">
                  <Header.Content>Name</Header.Content>
                  <Header.Subheader>{detailsData.name}</Header.Subheader>
                </Header>

                {/* Categories */}
                <Header as="h5">
                  <Header.Content>Categories</Header.Content>
                  <Header.Subheader>
                    {/* Categories */}
                    <List horizontal bulleted>
                      {categories.map((category, index) => (
                        <List.Item key={index.toString()}>
                          {category.title}
                        </List.Item>
                      ))}
                    </List>
                  </Header.Subheader>
                </Header>

                {/* Address */}
                <Header as="h5">
                  <Header.Content>Address</Header.Content>
                  <Header.Subheader>
                    <List>
                      {displayAddress.map((address, index) => (
                        <List.Item key={index.toString()}>{address}</List.Item>
                      ))}
                    </List>
                  </Header.Subheader>
                </Header>

                {/* Phone */}
                <Header as="h5">
                  <Header.Content>Phone</Header.Content>
                  <Header.Subheader>
                    {detailsData.display_phone}
                  </Header.Subheader>
                </Header>

                {/* Rating */}
                <Header as="h5">
                  <Header.Content>Price</Header.Content>
                  <Header.Subheader>{detailsData.price}</Header.Subheader>
                </Header>

                {/* Rating */}
                <Header as="h5">
                  <Header.Content>Rating</Header.Content>
                  <Header.Subheader>{detailsData.rating}</Header.Subheader>
                </Header>

                {/* Number of Reviews */}
                <Header as="h5">
                  <Header.Content>Number of Reviews</Header.Content>
                  <Header.Subheader>
                    {detailsData.review_count}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
            {/* Right */}
            <Grid.Column floated="right" width={6}>
              <Segment
                raised
                stacked
                padded
                style={{
                  color: '#F9F8F8'
                }}
              >
                <Modal
                  trigger={<Image size="medium" src={detailsData.image_url} />}
                >
                  <Image fluid rounded src={detailsData.image_url} />
                </Modal>
              </Segment>
            </Grid.Column>
          </Grid>

          {/* Images */}
          <Container
            style={{
              marginTop: '2rem'
            }}
          >
            <Header as="h2" dividing style={defaultTextColor}>
              <Icon name="images" size="tiny" style={defaultTextColor} /> Images
            </Header>
            <Carousel
              slidesToShow={3}
              autoplay
              swiping
              wrapAround
              cellSpacing={15}
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
                  <Modal trigger={<Image size="big" src={image} />}>
                    <Image size="massive" src={image} rounded />
                  </Modal>
                </Grid.Column>
              ))}
            </Carousel>
          </Container>

          {/* Reviews */}
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
              <Icon name="comments" size="tiny" style={defaultTextColor} />{' '}
              Reviews
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
                    <Comment.Avatar src={review.user.image_url} />
                    <Comment.Content>
                      <Comment.Author as="a">{review.user.name}</Comment.Author>
                      <Comment.Text>
                        <ReadMore
                          text={review.text}
                          min={80}
                          ideal={160}
                          max={200}
                          readMoreText="Read More"
                        />
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))}
              </Comment.Group>
            </Segment>
          </Container>
        </Container>
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userProfile, fetchRestaurants, favorite } = state;
  const { loggedIn } = userProfile;
  const { details, reviews } = fetchRestaurants;

  console.log('Resturants - mapStateToProps - ', fetchRestaurants);
  return {
    loggedIn,
    details,
    reviews,
    favorite
  };
}

export default withRouter(connect(mapStateToProps)(RestaurantDetail));
