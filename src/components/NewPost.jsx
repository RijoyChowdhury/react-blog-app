import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { format } from 'date-fns';

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const postBody = useStoreState((state) => state.postBody);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const savePost = useStoreActions((actions) => actions.savePost);
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
    savePost(newPost);
    navigate('/');
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