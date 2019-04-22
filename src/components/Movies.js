import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid,
  Menu,
  Container,
  Input,
  Pagination,
  Header
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ZeroHourMenu from '../containers/ZeroHourMenu';
import Footer from '../containers/Footer';
import {
  fetchNowPlayingMovie,
  fetchPopularMovie,
  fetchUpcomingMovie,
  fetchTrendingMovie,
  fetchTopRatedMovie
} from '../actions';
import MovieCard from '../containers/MovieCard';

const MoviePageInfo = props => (
  <Grid.Column
    floated="left"
    width={2}
    style={{
      marginBottom: '-2rem'
    }}
  >
    <Header as="h5" inverted>
      Page
      <Header.Subheader>{props.page}</Header.Subheader>
    </Header>
  </Grid.Column>
);

const MovieTotalResults = props => (
  <Grid.Column
    floated="right"
    width={2}
    style={{
      marginBottom: '-2rem'
    }}
  >
    <Header as="h5" inverted>
      Total Results
      <Header.Subheader>{props.results}</Header.Subheader>
    </Header>
  </Grid.Column>
);

const MoviePagination = props => (
  <Grid.Row
    style={{
      marginTop: '-4rem',
      marginBottom: '4rem'
    }}
  >
    <Pagination
      inverted
      activePage={props.activePage}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      onPageChange={props.onPageChange}
      totalPages={props.pages ? props.pages : 0}
    />
  </Grid.Row>
);

class Movies extends Component {
  state = { activeItem: 'trending', activePage: 1 };

  componentDidMount() {
    const { dispatch } = this.props;
    const { activePage } = this.state;
    dispatch(fetchTrendingMovie(activePage));
    dispatch(fetchTopRatedMovie(activePage));
    dispatch(fetchNowPlayingMovie(activePage));
    dispatch(fetchPopularMovie(activePage));
    dispatch(fetchUpcomingMovie(activePage));
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handlePaginationChange = (e, { activePage }) => {
    const { dispatch } = this.props;
    const { activeItem } = this.state;

    this.setState({ activePage });

    switch (activeItem) {
      case 'trending':
        return dispatch(fetchTrendingMovie(activePage));
      case 'top rated':
        return dispatch(fetchTopRatedMovie(activePage));
      case 'now playing':
        return dispatch(fetchNowPlayingMovie(activePage));
      case 'popular':
        return dispatch(fetchPopularMovie(activePage));
      case 'upcoming':
        return dispatch(fetchUpcomingMovie(activePage));
      default:
        dispatch(fetchTrendingMovie(activePage));
    }
  };

  switchTabs(activeItem, result) {
    const { activePage } = this.state;
    const {
      nowPlaying,
      popularMovie,
      topRatedMovie,
      trending,
      upcomingMovie
    } = result;
    const movieObject = {
      page: 1,
      results: []
    };
    const nowPlayingData =
      nowPlaying.data === undefined ? movieObject : nowPlaying.data;
    const popularMovieData =
      popularMovie.data === undefined ? movieObject : popularMovie.data;
    const topRatedMovieData =
      topRatedMovie.data === undefined ? movieObject : topRatedMovie.data;
    const trendingData =
      trending.data === undefined ? movieObject : trending.data;
    const upcomingMovieData =
      upcomingMovie.data === undefined ? movieObject : upcomingMovie.data;

    switch (activeItem) {
      case 'trending':
        return (
          <Grid centered>
            <MoviePageInfo page={trendingData.page} />
            <MovieTotalResults results={trendingData.total_results} />
            <MovieCard movies={trendingData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={trendingData.total_pages}
            />
          </Grid>
        );
      case 'top rated':
        return (
          <Grid centered>
            <MoviePageInfo page={topRatedMovieData.page} />
            <MovieTotalResults results={topRatedMovieData.total_results} />
            <MovieCard movies={topRatedMovieData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={topRatedMovieData.total_pages}
            />
          </Grid>
        );
      case 'now playing':
        return (
          <Grid centered>
            <MoviePageInfo page={nowPlayingData.page} />
            <MovieTotalResults results={nowPlayingData.total_results} />
            <MovieCard movies={nowPlayingData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={nowPlayingData.total_pages}
            />
          </Grid>
        );
      case 'popular':
        return (
          <Grid centered>
            <MoviePageInfo page={popularMovieData.page} />
            <MovieTotalResults results={popularMovieData.total_results} />
            <MovieCard movies={popularMovieData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={popularMovieData.total_pages}
            />
          </Grid>
        );
      case 'upcoming':
        return (
          <Grid centered>
            <MoviePageInfo page={upcomingMovieData.page} />
            <MovieTotalResults results={upcomingMovieData.total_results} />
            <MovieCard movies={upcomingMovieData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={upcomingMovieData.total_pages}
            />
          </Grid>
        );
      default:
        return (
          <Grid centered>
            <MoviePageInfo page={trendingData.page} />
            <MovieTotalResults results={trendingData.total_results} />
            <MovieCard movies={trendingData.results} />
            <MoviePagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              pages={trendingData.total_pages}
            />
          </Grid>
        );
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <Grid.Row>
            <ZeroHourMenu name="movies" />
            {/* Tab */}
            <Container>
              <Menu tabular inverted>
                <Menu.Item
                  name="trending"
                  active={activeItem === 'trending'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="top rated"
                  active={activeItem === 'top rated'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="now playing"
                  active={activeItem === 'now playing'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="popular"
                  active={activeItem === 'popular'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="upcoming"
                  active={activeItem === 'upcoming'}
                  onClick={this.handleItemClick}
                />
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input
                      transparent
                      inverted
                      icon={{ name: 'search', link: true }}
                      placeholder="Search movies..."
                    />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              {this.switchTabs(activeItem, this.props)}
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
  const { fetchMovies } = state;
  const {
    nowPlaying,
    popularMovie,
    topRatedMovie,
    trending,
    upcomingMovie
  } = fetchMovies;
  console.log('Movie - mapStateToProps: ', fetchMovies);

  return {
    nowPlaying,
    popularMovie,
    topRatedMovie,
    trending,
    upcomingMovie
  };
}

export default withRouter(connect(mapStateToProps)(Movies));
