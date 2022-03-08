import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import useAxiosFetch from './hooks/useAxiosFetch';
import {Layout, Home, NewPost, EditPost, PostPage, About, Missing} from './components';

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  const setPosts = useStoreActions((actions) => actions.setPosts);

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home fetchError={fetchError} isLoading={isLoading} />} />
        <Route path='post'>
          <Route index element={<NewPost />} />
          <Route path=':id' element={<PostPage />} />
        </Route>
        <Route path='edit/:id' element={<EditPost />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
