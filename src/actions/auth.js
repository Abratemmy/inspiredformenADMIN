import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";


export const signin = (values, setLoading, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(values);
        dispatch({ type: AUTH, data });
        setLoading(false)
        alert("Correct Email and Password!!!. Click OK to continue")
        navigate('/posts');
    } catch (error) {
        setLoading(false)
        alert("Your credentials are not correct.")
        console.log(error)
    }
}

export const signup = (values, setLoading, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(values);
        dispatch({ type: AUTH, data });
        setLoading(false)
        alert("Account created successfully")
        navigate('/')
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}