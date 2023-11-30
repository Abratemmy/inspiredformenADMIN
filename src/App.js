import React, { useEffect } from 'react';
import './App.css';
import Router from './pages/router';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from './actions/posts';


function App() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state?.postReducer);

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className="">
      <Router posts={posts} />
    </div>
  );
}

export default App;
