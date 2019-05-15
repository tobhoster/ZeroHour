import React, { Component } from 'react';
import {
  Grid,
  Header,
  Container,
  Segment,
  Item,
  Label,
  Button,
  Icon,
  List,
  Rating
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';
import {
  getFavoritesFromDB,
  deleteFavorite
} from '../actions/favoritesActions';

class Favorites extends Component {
  state = { activeItem: 'upcoming' };

  componentDidMount() {
    const { dispatch, history } = this.props;

    // dispatch(loginState(history));
    dispatch(getFavoritesFromDB(history));
  }

  deleteFavoriteResturant(id) {
    const { dispatch, history } = this.props;

    dispatch(deleteFavorite(id, history));
  }

  deleteFavoriteMovie(id) {
    const { dispatch, history } = this.props;

    dispatch(deleteFavorite(id, history));
  }

  openMovieDetails(title) {
    this.props.history.push(`/${title}/details`);
  }

  openRestaurantDetails(title) {
    this.props.history.push(`/restaurant/${title}/details`);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    // const { activeItem } = this.state;
    const { favorites } = this.props;
    const favoritesData = favorites === undefined ? [] : favorites;

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name="login" />
          </Grid.Row>
          <Grid.Row>
            <Container>
              <Segment
                style={{
                  marginBottom: '2rem',
                  marginTop: '2rem'
                }}
              >
                <Header as="h1" dividing>
                  Favorites
                </Header>

                <Item.Group divided>
                  {favoritesData.map((favorite, index) => (
                    <Item key={index.toString()}>
                      {favorite.type === 'movie' ? (
                        <Item.Image
                          src={`https://image.tmdb.org/t/p/original/${
                            favorite.detail.poster_path
                          }`}
                          rounded
                          spaced="right"
                        />
                      ) : (
                        <Item.Image src={favorite.detail.image_url} rounded />
                      )}

                      {favorite.type === 'movie' ? (
                        <Item.Content>
                          <Item.Header
                            as="a"
                            onClick={() =>
                              this.openMovieDetails(favorite.detail.id)
                            }
                          >
                            {favorite.detail.original_title}
                          </Item.Header>
                          <Item.Meta>
                            <span className="cinema">
                              {favorite.detail.tagline}
                            </span>
                          </Item.Meta>
                          <Item.Description>
                            {favorite.detail.overview}
                          </Item.Description>
                          <Item.Extra>
                            <Button
                              floated="right"
                              color="red"
                              animated
                              onClick={() =>
                                this.deleteFavoriteMovie(favorite.detail.id)
                              }
                            >
                              <Button.Content visible>
                                Delete Movie
                              </Button.Content>
                              <Button.Content hidden>
                                <Icon name="delete" />
                              </Button.Content>
                            </Button>
                            <Label>Movie</Label>
                          </Item.Extra>
                        </Item.Content>
                      ) : (
                        <Item.Content>
                          <Item.Header
                            as="a"
                            onClick={() =>
                              this.openRestaurantDetails(favorite.detail.id)
                            }
                          >
                            {favorite.detail.name}
                          </Item.Header>
                          <Item.Meta>
                            <List floated="right">
                              {favorite.detail.location.display_address !==
                              undefined ? (
                                favorite.detail.location.display_address.map(
                                  (address, index) => (
                                    <List.Item key={index.toString()}>
                                      {address}
                                    </List.Item>
                                  )
                                )
                              ) : (
                                <div />
                              )}
                            </List>
                          </Item.Meta>
                          <Item.Description>
                            {/* Categories */}
                            <List horizontal bulleted>
                              {favorite.detail.categories.map(
                                (category, index) => (
                                  <List.Item key={index.toString()}>
                                    {category.title}
                                  </List.Item>
                                )
                              )}
                            </List>
                          </Item.Description>
                          <Item.Extra>
                            {/* Phone */}
                            <Header as="h5">
                              <Header.Content>Phone</Header.Content>
                              <Header.Subheader>
                                {favorite.detail.display_phone}
                              </Header.Subheader>
                            </Header>

                            <Header as="h4" floated="right">
                              <Header.Content>Price</Header.Content>
                              <Header.Subheader>
                                {favorite.detail.price}
                              </Header.Subheader>
                            </Header>

                            {/* Rating */}
                            <Rating
                              defaultRating={favorite.detail.rating}
                              maxRating={5}
                              disabled
                              size="massive"
                              style={{
                                marginTop: '1rem',
                                marginBottom: '1rem'
                              }}
                            />
                          </Item.Extra>
                          <Item.Extra>
                            <Button
                              floated="right"
                              secondary
                              animated
                              onClick={() =>
                                this.deleteFavoriteResturant(favorite.detail.id)
                              }
                            >
                              <Button.Content visible>
                                Delete Restaurant
                              </Button.Content>
                              <Button.Content hidden>
                                <Icon name="delete" />
                              </Button.Content>
                            </Button>
                            <Label>Restaurant</Label>
                          </Item.Extra>
                        </Item.Content>
                      )}
                    </Item>
                  ))}
                </Item.Group>
              </Segment>
            </Container>
          </Grid.Row>
        </Grid>
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userProfile, favorite } = state;
  const { loggedIn } = userProfile;
  const { favorites } = favorite;

  return {
    loggedIn,
    favorites
  };
}

export default withRouter(connect(mapStateToProps)(Favorites));
