import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Image, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMovieGenre, fetchDiscoverMovie } from '../actions/moviesActions';
import Footer from '../containers/Footer';
import CircularProgressbar from '../containers/CircularProgressBar';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import MovieCard from '../containers/MovieCard';

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
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDiscoverMovie());
    dispatch(getMovieGenre());

    console.log('Props: ', this.props);
  }

  openMovieDetails(title) {
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
            <ZeroHourMenu name="home" />
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
          {/* Movies Card */}
          <MovieCard movies={movies} />
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
