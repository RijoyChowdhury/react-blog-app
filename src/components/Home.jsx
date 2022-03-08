import React from 'react';
import { useStoreState } from 'easy-peasy';
import Feed from './Feed';

const Home = ({fetchError, isLoading}) => {
  const posts = useStoreState((state) => state.searchResults);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts...</p>}
      {fetchError && !isLoading && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className='statusMsg'>No posts to display</p>)}
    </main>
  )
}

export default Home