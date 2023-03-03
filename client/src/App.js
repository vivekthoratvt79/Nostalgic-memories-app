import React, { useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Posts from './components/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Header as='h2' block textAlign='center' className='main-header'>
        Nostalgic - Memories
        <Header.Subheader>
          Share and re-live your memories with us <Icon name='smile outline' />
        </Header.Subheader>
      </Header>
      <Posts />
    </>
  );
};

export default App;
