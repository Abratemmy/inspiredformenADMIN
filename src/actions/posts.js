import * as api from "../api";

import { FETCH_ALL, DELETE, UPDATE, CREATE } from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (values, setLoading, clear) => async (dispatch) => {
    try {
        setLoading(true)
        const { data } = await api.createPost(values);
        dispatch({ type: CREATE, payload: data });
        setLoading(false)
        alert("Post created successfully. Refresh your browser to view post")
        clear()

    } catch (error) {
        setLoading(true)
        alert('Ohpps, unable to create new post due to an error.')
        console.log(error)
    }
}

export const updatePost = (id, post, setLoading, clear) => async (dispatch) => {
    try {
        setLoading(true)
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
        setLoading(false)
        alert('Post editted successfully')
        clear()

    } catch (error) {
        setLoading(false)
        console.log(error);
        alert('Ohpps, unable to create new post due to an error.')
    }
}

export const deletePost = (id, setLoading, setShowAlert) => async (dispatch) => {
    setLoading(true)
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
        setLoading(false)
        setShowAlert(false)
        alert("Post deleted successfully. Refresh your browser to view")
    } catch (error) {
        setLoading(false)
        alert("0hpps, Unable to delete Post")
        console.log(error)
    }
}