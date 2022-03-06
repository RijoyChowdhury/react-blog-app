import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id);
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
        try {
            const resposne = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? { ...resposne.data } : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
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