import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id,
      title: postTitle,
      body: postBody,
      datetime
    };
    try {
      const resposne = await api.post('/posts', newPost);
      const allPosts = [...posts, resposne.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' action="" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input type="text" id='postTitle' required value={postTitle} onChange={e => setPostTitle(e.target.value)} />
        <label htmlFor="postBody">Post</label>
        <textarea required value={postBody} onChange={e => setPostBody(e.target.value)} id="postBody"></textarea>
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost