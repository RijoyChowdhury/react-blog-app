import React from 'react';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Feed from './Feed';

const Home = () => {
  const {searchResults: posts, fetchError, isLoading} = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {fetchError && !isLoading && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className='statusMsg'>No posts to display</p>)}
    </main>
  )
}

export default Home