import React from 'react';
import { Grid, Card, Dimmer, Loader, Icon, Header } from 'semantic-ui-react';
import Forms from './Forms';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <Dimmer active inverted>
      <Loader size='medium'>Loading</Loader>
    </Dimmer>
  ) : (
    <Grid
      columns={2}
      relaxed='very'
      doubling
      reversed='mobile vertically tablet vertically'
      divided
      padded='horizontally'
    >
      <Grid.Column width={10}>
        <Header as='h2' className='news-feed-header' textAlign='center'>
          <Icon name='newspaper outline' />
          News Feed
        </Header>
        <Card.Group
          className='card-grp-container'
          centered
          stackable
          itemsPerRow={3}
        >
          {posts.map((post, n) => {
            return <Post post={post} key={n} />;
          })}
        </Card.Group>
      </Grid.Column>

      <Grid.Column width={6}>
        <Forms />
      </Grid.Column>
    </Grid>
  );
};

export default Posts;
