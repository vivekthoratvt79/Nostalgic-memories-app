import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const Post = (props) => {
  let date = props.post.createdAt;
  date = new Date(date).toLocaleDateString();
  return (
    <Card
      image={props.post.selectedFile}
      header={props.post.title}
      meta={props.post.creator}
      description={props.post.message}
      extra={
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>
              <Icon name='like' size='large' link color={`red`} />
              &nbsp;{props.post.likeCount}
            </p>
            <p>
              <Icon name='trash alternate' link size='large' />
            </p>
          </div>
          <p style={{ float: 'right' }}>{date}</p>
        </>
      }
    />
  );
};

export default Post;
