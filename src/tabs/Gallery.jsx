import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };
  // componentDidMount() {
  //   ImageService.getImages('cat', 1);
  // }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, page) => {
    const result = await ImageService.getImages(query, page);
    console.log(result);
    this.setState({ images: result.data.photos });
  };

  handleSubmit = value => {
    this.setState({ query: value });
    console.log(value);
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {images.map(({ alt, id, src }) => (
            <GridItem key={id}>
              <CardItem>
                <img src={src.small} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
