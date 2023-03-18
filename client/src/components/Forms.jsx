import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Accordion,
  Icon,
  Progress,
} from 'semantic-ui-react';
import memories from '../Images/camera.jpeg';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';
import { useNavigate } from 'react-router-dom';

const Forms = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let initailActiveIndex;
  if (windowSize.current[0] > 991) {
    initailActiveIndex = 0;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  const [state, setState] = useState({ activeIndex: initailActiveIndex });
  const [showProgress, setShowProgress] = useState({ show: false, value: 0 });
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;
    setState({ activeIndex: newIndex });
  };
  const { activeIndex } = state;

  const handleChange = (e, { name, value }) => {
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    setShowProgress({ show: true, value: 50 });
    e.preventDefault();
    const { title, message, tags, selectedFile } = postData;
    if (!title || !message || !tags || !selectedFile) {
      if (!selectedFile) {
        document.getElementById('file-select-message').innerText =
          'Please upload a picture.';
        setTimeout(() => {
          document.getElementById('file-select-message').innerText = '';
        }, 3000);
      }
      setShowProgress({ show: false, value: 25 });
      return false;
    }
    document.getElementById('file-select-message').innerText = '';

    dispatch(createPost({ ...postData, name: user?.result?.name }));
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    setShowProgress({ show: true, value: 100 });
    document.getElementById('base64-input-parent').childNodes[0].value = '';
    if (windowSize.current[0] > 991) {
      initailActiveIndex = 0;
    } else {
      setState({ activeIndex: null });
    }
    setTimeout(() => {
      setShowProgress({ show: false, value: 25 });
    }, 1500);
  };
  if (!user?.result?.name) {
    return (
      <Button
        className='login-to-post'
        basic
        fluid
        color='red'
        style={{ width: '100%' }}
        onClick={() => navigate('/auth')}
      >
        &nbsp;&nbsp;Log In to Post your Memory&nbsp;
      </Button>
    );
  }

  return (
    <Accordion>
      <Grid
        textAlign='center'
        style={{ height: '88vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Button className='post-your-memory-btn'>
              <Header
                as='h3'
                color='teal'
                textAlign='center'
                className='form-header'
              >
                <Image src={memories} />
                &nbsp;&nbsp;&nbsp;Post Your Memory&nbsp;
                <Icon
                  name={`${activeIndex !== 0 ? `add circle` : `minus circle`}`}
                  link
                />
              </Header>
            </Button>
          </Accordion.Title>
          {showProgress.show ? (
            <Progress percent={showProgress.value} color='green' progress>
              Uploaded Successfully
            </Progress>
          ) : (
            ''
          )}

          <Accordion.Content active={activeIndex === 0}>
            <Form size='large' onSubmit={handleSubmit} className='post-form'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='write'
                  iconPosition='left'
                  placeholder='Title'
                  name='title'
                  value={postData.title}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  fluid
                  icon='file text'
                  iconPosition='left'
                  placeholder='Message'
                  name='message'
                  value={postData.message}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  fluid
                  icon='tags'
                  iconPosition='left'
                  placeholder='Tags with comma separated'
                  name='tags'
                  value={postData.tags}
                  onChange={handleChange}
                  required
                />
                <div className='field' id='base64-input-parent'>
                  <FileBase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({ ...postData, selectedFile: base64 })
                    }
                  />
                  <span id='file-select-message'></span>
                </div>

                <Button color='teal' fluid size='large' type='submit'>
                  Post
                </Button>
              </Segment>
            </Form>
          </Accordion.Content>
        </Grid.Column>
      </Grid>
    </Accordion>
  );
};

export default Forms;
