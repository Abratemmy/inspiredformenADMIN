import axios from "axios";
const API = axios.create({ baseURL: 'https://inspiredformenserver.onrender.com'})

export const fetchPosts = () =>API.get('/posts');
export const createPost = (newPost) =>API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) =>API.delete(`/posts/${id}`);

export const fetchCategory = ()=>API.get('/category');
export const createCategory = (newPost) => API.post('/category', newPost)


export  const signIn = (values) => API.post('/user/signin', values)
export  const signUp = (values) => API.post('/user/signup', values)


