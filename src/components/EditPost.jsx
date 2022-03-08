import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { format } from 'date-fns';

const EditPost = () => {
    const editTitle = useStoreState((state) => state.editTitle);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const getPostById = useStoreState((state) => state.getPostById);
    const editPost = useStoreActions((actions) => actions.editPost);

    const { id } = useParams();
    const post = getPostById(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {
            id,
            title: editTitle,
            body: editBody,
            datetime
        };
        editPost(updatedPost);
        navigate('/');
    };

    return (
        <main className='NewPost'>
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' action="" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="postTitle">Title</label>
                        <input type="text" id='postTitle' required value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                        <label htmlFor="postBody">Post</label>
                        <textarea required value={editBody} onChange={e => setEditBody(e.target.value)} id="postBody"></textarea>
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            )}
            {!editTitle && (
                <>
                    <h2>Post not found</h2>
                    <p>Well, thats disappointing.</p>
                    <p>
                        <Link to='/'>Visit our Homepage</Link>
                    </p>
                </>
            )}
        </main>
    )
}

export default EditPost