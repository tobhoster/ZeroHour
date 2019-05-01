import React, { Component } from 'react';
import {
  Container,
  Image,
  Card,
  List,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class RestaurantCard extends Component {
  openRestaurantDetails(title) {
    this.props.history.push(`/restaurant/${title}/details`);
  }

  render() {
    const { restaurants } = this.props;

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
            marginTop: '1.5rem'
          }}
        >
          {restaurants.map((restaurant, index) => (
            <Card
              className="card"
              raised
              key={index.toString()}
              onClick={() => this.openRestaurantDetails(restaurant.id)}
            >
              <Card.Content>
                <Image src={restaurant.image_url} rounded fluid />
                <Card.Header
                  style={{
                    marginTop: '1rem'
                  }}
                >
                  {restaurant.name}
                </Card.Header>

                <Card.Description>
                  {/* Categories */}
                  <List horizontal bulleted>
                    {restaurant.categories.map((category, index) => (
                      <List.Item key={index.toString()}>
                        {category.title}
                      </List.Item>
                    ))}
                  </List>
                </Card.Description>

                {/* Display Address */}
                <List>
                  {restaurant.location.display_address.map((address, index) => (
                    <List.Item key={index.toString()}>{address}</List.Item>
                  ))}
                </List>

                <Segment.Inline>
                  <Icon name="phone" rotated="clockwise" size="small" />
                  <span>{restaurant.display_phone}</span>
                </Segment.Inline>

                <Segment.Inline>
                  <Icon name="star" size="small" />
                  <span>{restaurant.rating}</span>
                </Segment.Inline>

                <Segment.Inline>
                  <Icon name="location arrow" size="small" />
                  <span>{`${(restaurant.distance / 1609.344).toFixed(
                    2
                  )} miles`}</span>
                </Segment.Inline>

                <Label
                  style={{
                    marginTop: '1rem'
                  }}
                  color="grey"
                  ribbon="right"
                >
                  {restaurant.price}
                </Label>

                {restaurant.is_closed ? (
                  <Label floating color="red">
                    Closed
                  </Label>
                ) : (
                  <Label floating color="green">
                    Open
                  </Label>
                )}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default withRouter(RestaurantCard);
