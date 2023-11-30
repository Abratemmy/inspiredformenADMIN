import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Addpost from './addpost/addpost';
import Register from './register/register';
import Signin from './Signin/signin';
import Post from './viewpost/post';

const Router = ({ posts }) => {
    const [currentId, setCurrentId] = useState(null);

    return (
        <Routes>

            <Route exact path='/' caseSensitive={false} element={<Signin />} />
            <Route exact path='/addpost' caseSensitive={false} element={<Addpost currentId={currentId} setCurrentId={setCurrentId} posts={posts} />} />
            <Route exact path="/signup123456" caseSensitive={false} element={<Register />} />
            <Route exact path="/posts" caseSensitive={false} element={<Post setCurrentId={setCurrentId} currentId={currentId} posts={posts} />} />
        </Routes>
    )
}
export default Router
