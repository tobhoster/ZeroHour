import React, { Component } from 'react';
import {
  Header,
  Image,
  Grid,
  List,
  Statistic,
  Divider
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  queryForDetails,
  getRecommendationMovie,
  getMovieCredits,
  getIMDBMovieInfo,
  getMovieReviews
} from '../actions';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import { withRouter } from 'react-router-dom';

import CarouselVideos from '../containers/CarouselVideos';
import CarouselImages from '../containers/CarouselImages';
import MovieRecommendations from '../containers/MovieRecommendations';
import MovieInfo from '../containers/MovieInfo';
import Footer from '../containers/Footer';
import CarouselMovieCredits from '../containers/CarouselMovieCredits';
import Reviews from '../containers/Reviews';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

const MovieDetailsStatistics = props => (
  <Statistic.Group size="tiny" horizontal>
    <Statistic>
      <Statistic.Value style={defaultTextColor}>{`${currencyFormatter.format(
        props.detail.budget,
        {
          code: 'USD'
        }
      )}`}</Statistic.Value>
      <Statistic.Label style={defaultTextColor}>Budget</Statistic.Label>
    </Statistic>
    <Statistic>
      <Statistic.Value style={defaultTextColor}>{`${currencyFormatter.format(
        props.detail.revenue,
        {
          code: 'USD'
        }
      )}`}</Statistic.Value>
      <Statistic.Label style={defaultTextColor}>Revenue</Statistic.Label>
    </Statistic>
  </Statistic.Group>
);

const MovieDetailsHeader = props => (
  <Grid.Row
    verticalAlign="bottom"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${
        props.detail.backdrop_path
      })`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}
  >
    <Image
      // size="massive"
      src={`https://image.tmdb.org/t/p/original/${props.detail.poster_path}`}
      rounded
      spaced="right"
      as="a"
      href={`${props.detail.homepage}`}
      target="_blank"
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
          {props.detail.original_title}
        </Header.Content>
        <Header.Subheader style={defaultTextColor}>
          {props.detail.tagline}
          <Divider />
          {props.detail.overview}
        </Header.Subheader>
      </Header>

      <Header as="h5" style={defaultTextColor}>
        <List horizontal>
          {props.genres.map((genre, index) => (
            <List.Item key={index.toString()}>{genre.name}</List.Item>
          ))}
        </List>
        <Header.Subheader style={defaultTextColor}>
          {`Release Date: ${moment(props.detail.release_date).format('LL')}`}
        </Header.Subheader>
      </Header>
    </Grid.Column>
    <Grid.Column>
      <MovieDetailsStatistics detail={props.detail} />
    </Grid.Column>
  </Grid.Row>
);

class MovieDetails extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      window.location.reload();
    }
  }

  componentDidMount() {
    const { dispatch, match, detail } = this.props;
    const { params } = match;
    console.log('MovieDetails - match: ', match);
    console.log('MovieDetails - detail: ', detail);

    dispatch(queryForDetails(params.movieId));
    dispatch(getRecommendationMovie(params.movieId));
    dispatch(getMovieCredits(params.movieId));
    dispatch(getIMDBMovieInfo(params.movieId));
    dispatch(getMovieReviews(params.movieId));
  }

  render() {
    const { detail, recommendations, credits, imdb, reviews } = this.props;
    const genres = detail.genres === undefined ? [] : detail.genres;
    const videos = detail.videos === undefined ? [] : detail.videos.results;
    const images = detail.images === undefined ? [] : detail.images.backdrops;
    const movieRecommendations =
      recommendations === undefined ? [] : recommendations;
    const movieReviews = reviews === undefined ? [] : reviews;
    const casts = credits === undefined ? [] : credits.cast;
    const movieImdb = imdb === undefined ? {} : imdb;
    const max = images.length;

    return (
      <div>
        <Grid
          style={{
            background: '#1A1A1C'
          }}
        >
          <MovieDetailsHeader detail={detail} genres={genres} />
          <Grid.Row />
        </Grid>
        {/* Overview */}
        <MovieInfo info={movieImdb} />
        {/* Cast */}
        <CarouselMovieCredits
          credits={casts}
          title="Crew"
          icon="new pied piper"
        />
        {/* Images */}
        <CarouselImages images={images} />
        {/* Videos */}
        <CarouselVideos images={images} max={max} videos={videos} />
        {/* Reviews */}
        <Reviews reviews={movieReviews} />
        {/* Movies Recommendations */}
        <MovieRecommendations
          recommendations={movieRecommendations}
          history={this.props.history}
        />
        <Footer />
      </div>
    );
  }
}

MovieDetails.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  detail: PropTypes.object,
  recommendations: PropTypes.array,
  credits: PropTypes.object,
  imdb: PropTypes.object
};

MovieDetailsHeader.propTypes = {
  detail: PropTypes.object,
  genres: PropTypes.array
};

MovieDetailsStatistics.propTypes = {
  detail: PropTypes.object
};

function mapStateToProps(state) {
  const { discovery } = state;
  const { detail, recommendations, credits, imdb, reviews } = discovery;
  console.log('MovieDetails - mapStateToProps: ', detail);

  return {
    detail,
    recommendations,
    credits,
    imdb,
    reviews
  };
}

export default withRouter(connect(mapStateToProps)(MovieDetails));
