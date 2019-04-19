import React, { Component } from 'react';
import {
  Container,
  Card,
  Image,
  Rating,
  Grid,
  Header
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMovieGenre, fetchDiscoverMovie } from '../actions';
import Footer from '../containers/Footer';
import CircularProgressbar from '../containers/CircularProgressBar';
import ZeroHourMenu from '../containers/ZeroHourMenu';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDiscoverMovie());
    dispatch(getMovieGenre());

    // console.log("Test: ", dispatch(searchMovie("iron man")));
    console.log('Props: ', this.props);
  }

  componentWillMount() {
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.setState({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     });
    //     console.log("componentWillMount: ", this.state);
    //   },
    //   err => console.log(err)
    // );
  }

  openMovieDetails(title) {
    console.log(`openMovieDetails - Event: `, title);

    this.props.history.push(`/${title}/details`);
  }

  render() {
    // const { activeItem } = this.state;
    const { movies } = this.props;
    const max = movies.length;
    const random = Math.floor(Math.random() * (max - 0));
    const first = movies[random] === undefined ? [] : movies[random];

    return (
      <div>
        <Grid>
          <Grid.Row>
            <ZeroHourMenu />
          </Grid.Row>
          <Grid.Row
            verticalAlign="bottom"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                first.backdrop_path
              })`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
            onClick={() => this.openMovieDetails(first.id)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original/${first.poster_path}`}
              rounded
              spaced="right"
              as="a"
              style={{
                marginTop: '15rem',
                marginLeft: '6rem',
                borderStyle: 'solid',
                borderWidth: 'medium',
                borderColor: '#F0EBE5',
                width: '18%'
              }}
            />
            <Grid.Column width={6}>
              <Header as="h1">
                <Header.Content style={defaultTextColor}>
                  {first.original_title}
                </Header.Content>
                <Header.Subheader style={defaultTextColor}>
                  {first.overview}
                </Header.Subheader>
              </Header>

              <Header as="h5" style={defaultTextColor}>
                {/* <List horizontal>
                {props.genres.map((genre, index) => (
                  <List.Item key={index.toString()}>{genre.name}</List.Item>
                ))}
              </List> */}
                <Header.Subheader style={defaultTextColor}>
                  {`Release Date: ${moment(first.release_date).format('LL')}`}
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column width={3}>{/* Space */}</Grid.Column>
            <Grid.Column>
              <CircularProgressbar
                strokeWidth={10}
                sqSize={120}
                strokeDashoffset={50}
                percentage={first.vote_average * 10}
              />
            </Grid.Column>
          </Grid.Row>
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
        </Grid>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedMovie, discovery } = state;
  console.log('mapStateToProps: ', state);
  return {
    selectedMovie,
    movies: discovery.movies,
    timeStamp: discovery.lastUpdated
  };
}

export default connect(mapStateToProps)(Home);
