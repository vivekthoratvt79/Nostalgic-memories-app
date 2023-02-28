import React, { useState, useRef } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import memories from '../Images/camera.jpeg';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';

const Forms = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let initailActiveIndex;
  if (windowSize.current[0] > 991) {
    initailActiveIndex = 0;
  }

  const [state, setState] = useState({ activeIndex: initailActiveIndex });

  const [postData, setPostData] = useState({
    creator: '',
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

  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) => {
    setPostData({ ...postData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
  };

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
          <Accordion.Content active={activeIndex === 0}>
            <Form size='large' onSubmit={handleSubmit} className='post-form'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Creator name'
                  name='creator'
                  value={postData.creator}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  icon='write'
                  iconPosition='left'
                  placeholder='Title'
                  name='title'
                  value={postData.title}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  icon='file text'
                  iconPosition='left'
                  placeholder='Message'
                  name='message'
                  value={postData.message}
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  icon='tags'
                  iconPosition='left'
                  placeholder='Tags'
                  name='tags'
                  value={postData.tags}
                  onChange={handleChange}
                />
                <div className='field'>
                  <FileBase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({ ...postData, selectedFile: base64 })
                    }
                  />
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
