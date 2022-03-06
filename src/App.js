import { Route, Routes } from 'react-router-dom';
import {Layout, Home, NewPost, EditPost, PostPage, About, Missing} from './components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
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
