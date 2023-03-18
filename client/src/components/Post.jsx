import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Header, Modal, Button } from 'semantic-ui-react';
import { updatePost, deletePost, getPosts, likePost } from '../actions/posts';
import moment from 'moment';

const Post = (props) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [curId, setCurId] = useState(null);

  const DeleteModal = () => {
    return (
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
      >
        <Header icon>
          <Icon name='archive' />
          Delete This Post?
        </Header>
        <Modal.Content>
          <p style={{ textAlign: 'center' }}>
            Are you sure you want to delete this post
          </p>
        </Modal.Content>
        <Modal.Actions>
          <p style={{ textAlign: 'center' }}>
            <Button color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={confirmDelete}>
              <Icon name='checkmark' /> Yes
            </Button>
          </p>
        </Modal.Actions>
      </Modal>
    );
  };

  const handleEdit = (e) => {
    setEdit(true);

    const card = document.getElementById(e.target.attributes._id.value);
    const titleDiv = card.getElementsByClassName('header')[0];
    const captionDiv = card.getElementsByClassName('card-desc')[0];
    const hashDiv = card.getElementsByClassName('card-hashtag')[0];
    // const nameDiv = card.getElementsByClassName('meta')[0];

    titleDiv.classList += ' div-editable';
    hashDiv.classList += ' div-editable';
    captionDiv.classList += ' div-editable';
    // nameDiv.classList += ' div-editable';
    hashDiv.innerText = props.post.tags;
  };

  const handleSave = (e) => {
    setEdit(false);
    const postId = e.target.attributes._id.value;
    const card = document.getElementById(postId);
    const titleDiv = card.getElementsByClassName('header')[0];
    const captionDiv = card.getElementsByClassName('card-desc')[0];
    const hashDiv = card.getElementsByClassName('card-hashtag')[0];
    const nameDiv = card.getElementsByClassName('meta')[0];
    titleDiv.classList.remove('div-editable');
    hashDiv.classList.remove('div-editable');
    captionDiv.classList.remove('div-editable');
    nameDiv.classList.remove('div-editable');

    const editedTitle = titleDiv.innerText;
    const editedCaption = captionDiv.innerText;
    const editedTags = hashDiv.innerText;
    const editedName = nameDiv.innerText;

    dispatch(
      updatePost(props.post._id, {
        title: editedTitle,
        message: editedCaption,
        tags: editedTags,
      })
    );
  };

  const handleDelete = (e) => {
    setCurId(e.target.attributes._id.value);
    setOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deletePost(curId));
    await dispatch(getPosts());
    setOpen(false);
  };
  // const user = JSON.parse(localStorage.getItem('profile'));
  const user = JSON.parse(localStorage.getItem('profile'));
  const usera = useSelector((state) => state.auth.authData);

  const Likes = () => {
    if (props.post.likes.length > 0) {
      return props.post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <p>
          <Icon
            name='like'
            size='large'
            link
            color='red'
            onClick={() => {
              dispatch(likePost(props.post._id));
            }}
          />
          &nbsp;{' '}
          {props.post.likes.length > 1
            ? `You and ${props.post.likes.length - 1} other liked`
            : `Only You liked this post`}
        </p>
      ) : (
        <p>
          <Icon
            name='heart outline'
            size='large'
            color='red'
            disabled={!user?.result}
            link={user?.result}
            onClick={() => {
              dispatch(likePost(props.post._id));
            }}
          />
          &nbsp; {props.post.likes.length} other liked this post
        </p>
      );
    }
    return (
      <p>
        <Icon
          name='heart outline'
          size='large'
          link
          color='red'
          onClick={() => {
            dispatch(likePost(props.post._id));
          }}
        />
        &nbsp; {props.post.likes.length}
      </p>
    );
  };

  return (
    <>
      <Card
        id={props.post._id}
        className='card-by-card'
        image={props.post.selectedFile}
        header={props.post.title}
        meta={props.post.name}
        description={
          <>
            <p className='card-desc'>{props.post.message} </p>
            <p
              className='card-hashtag'
              spellCheck={false}
              style={{ color: 'rgba(0,0,0,.4)' }}
            >
              {'#' +
                props.post?.tags[0].replaceAll(' ', '').replaceAll(',', ' #')}
            </p>
          </>
        }
        extra={
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Likes />
              {(props.post.creator === user?.result?.googleId ||
                props.post.creator === user?.result?._id) && (
                <p>
                  {edit ? (
                    <Icon
                      name='save'
                      className='save-icon'
                      _id={props.post._id}
                      link
                      onClick={handleSave}
                    />
                  ) : (
                    <Icon
                      name='edit outline'
                      className='edit-icon'
                      _id={props.post._id}
                      link
                      onClick={handleEdit}
                    />
                  )}
                  &nbsp; &nbsp;
                  <Icon
                    name='trash alternate'
                    className='del-icon'
                    link
                    color='black'
                    _id={props.post._id}
                    onClick={handleDelete}
                  />
                </p>
              )}
            </div>
            <p style={{ float: 'right' }}>
              {moment(props.post.createdAt).fromNow()}
            </p>
          </>
        }
      />
      <DeleteModal />
    </>
  );
};

export default Post;
