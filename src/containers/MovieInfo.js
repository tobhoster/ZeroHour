import React, { Component } from 'react';
import {
  Segment,
  Container,
  Header,
  Divider,
  Icon,
  Grid,
  Statistic,
  List,
  Image
} from 'semantic-ui-react';
import imdb from '../imdb.jpg';
import metacritic from '../metacritic.png';
import rottenTomatoes from '../RottenTomatoes.png';

const defaultTextColor = {
  color: 'white',
  textShadow: '2px 2px 8px black'
};

class MovieInfo extends Component {
  render() {
    const { info } = this.props;

    const movieRatings = info.Ratings === undefined ? [] : info.Ratings;
    const images = [imdb, rottenTomatoes, metacritic];

    return (
      <Container
        style={{
          marginTop: '2rem'
        }}
      >
        <Header as="h2" dividing style={defaultTextColor}>
          <Icon name="folder outline" size="tiny" style={defaultTextColor} />{' '}
          Overview
        </Header>
        <Grid>
          <Grid.Column floated="left" width={12}>
            <Segment
              raised
              stacked
              padded
              style={{
                color: '#F9F8F8'
              }}
            >
              <Header as="h4">
                <Header.Content>Plot</Header.Content>
                <Divider />
                <Header.Subheader>{info.Plot}</Header.Subheader>
              </Header>

              {/* Ratings */}
              <List horizontal size="large">
                {movieRatings.map((rating, index) => (
                  <List.Item key={index.toString()}>
                    <Image avatar src={images[index]} />
                    <List.Content>
                      <List.Header>{rating.Source}</List.Header>
                      <List.Content
                        style={{
                          color: 'grey'
                        }}
                      >
                        {rating.Value}
                      </List.Content>
                    </List.Content>
                  </List.Item>
                ))}
              </List>

              {/* Statistics */}
              <Statistic.Group size="tiny" horizontal>
                <Statistic>
                  <Statistic.Value>{info.Metascore}</Statistic.Value>
                  <Statistic.Label>Metascore</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{info.imdbRating}</Statistic.Value>
                  <Statistic.Label>IMDB Rating</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{info.imdbVotes}</Statistic.Value>
                  <Statistic.Label>IMDB Votes</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Segment>
          </Grid.Column>
          {/* Right */}
          <Grid.Column floated="right" width={4}>
            <Segment
              raised
              stacked
              style={{
                color: '#F9F8F8'
              }}
            >
              {/* Runtime */}
              <Header as="h5">
                <Header.Content>Runtime</Header.Content>
                <Header.Subheader>{info.Runtime}</Header.Subheader>
              </Header>

              {/* Rated */}
              <Header as="h5">
                <Header.Content>Rated</Header.Content>
                <Header.Subheader>{info.Rated}</Header.Subheader>
              </Header>

              {/* Language */}
              <Header as="h5">
                <Header.Content>Language</Header.Content>
                <Header.Subheader>{info.Language}</Header.Subheader>
              </Header>

              {/* Production */}
              <Header as="h5">
                <Header.Content>Production</Header.Content>
                <Header.Subheader>{info.Production}</Header.Subheader>
              </Header>

              {/* Genre */}
              <Header as="h5">
                <Header.Content>Genre</Header.Content>
                <Header.Subheader>{info.Genre}</Header.Subheader>
              </Header>

              {/* Director */}
              <Header as="h5">
                <Header.Content>Director</Header.Content>
                <Header.Subheader>{info.Director}</Header.Subheader>
              </Header>

              {/* Country */}
              <Header as="h5">
                <Header.Content>Country</Header.Content>
                <Header.Subheader>{info.Country}</Header.Subheader>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default MovieInfo;
