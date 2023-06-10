import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isShowButton: false,
    isEmpty: false,
    isLoading: false,
    error: null,
  };
  // componentDidMount() {
  //   ImageService.getImages('cat', 1);
  // }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, currentPage) => {
    this.setState({isLoading: true});
  try{

  const {data} = await ImageService.getImages(query, currentPage);
  
  const {page, per_page, photos, total_results} = data;

  if(!photos.length){
    this.setState({isEmpty: true})
    return;
  }

  this.setState(prevState => ({ images: [...prevState.images, ...photos], isShowButton: page < Math.ceil(total_results / per_page), }));
  }catch(error){
  this.setState({error: error.message});
  }
  finally{
    this.setState({isLoading: false});
  }

  };

  handleSubmit = value => {
    this.setState({ query: value, images: [], 
      page: 1, 
      isShowButton: false,
      isEmpty: false,
      isLoading: false,
      error: null,});
    console.log(value);
  };
  handleOnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
  render() {
    const { images, isShowButton, isLoading, isEmpty } = this.state;
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
        { isShowButton && <Button onClick={this.handleOnClick}>Load more</Button>}
        {isEmpty &&  <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        {isLoading && <Text textAlign="center">Loading ...</Text>}
      </>
    );
  }
}
