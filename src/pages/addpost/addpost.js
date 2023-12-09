import React, { useState } from 'react';
import './addpost.css';
import FileBase from "react-file-base64";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Navbar from '../Navbar/navbar';
import { NavLink } from 'react-router-dom';

function Addpost({ currentId, setCurrentId, posts }) {
    console.log("Curent Id", currentId)
    const [loading, setLoading] = useState(false)
    // const post = useSelector((state) => currentId ? state?.postReducer?.find((p) => p._id === currentId) : null)
    // console.log("POST", post)

    const filterPost = posts?.filter(post => {
        return post._id === currentId
    })

    const objectfilterPost = filterPost?.[0]

    console.log("ans", objectfilterPost?.topic)

    const [values, setValues] = useState({
        topic: objectfilterPost ? objectfilterPost?.topic : "",
        postername: objectfilterPost ? objectfilterPost?.postername : "",
        category: objectfilterPost ? objectfilterPost?.category : "",
        image: objectfilterPost ? objectfilterPost?.image : "",
        video: objectfilterPost ? objectfilterPost?.video : "",
        message: objectfilterPost ? objectfilterPost?.message : "",
    })

    // useEffect(() => {
    //     if (filterPost) setValues(filterPost)
    // }, [filterPost])

    const dispatch = useDispatch();
    const handleChange = (ev) => {
       console.log("TARGET", ev.target.name)
        console.log("TARGET33", ev.target.value)
        if (ev.target.name === "topic") {

            setValues({
                ...values,
                [ev.target.name]: ev.target.value.replace(/[^a-z0-9' ]/gi, ""),
            });
        } else {
            setValues({
                ...values,
                [ev.target.name]: ev.target.value,
            });
        }
    };
    const handleQuillEdit = (value) => {
        setValues((prev) => {
            return {
                ...prev,
                message: value
            }
        })
    }

    const clear = () => {
        setCurrentId(null);
        setValues({
            topic: "",
            postername: "",
            category: "",
            image: "",
            video: "",
            message: "",
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, values, setLoading, clear));
            // alert("Post updated successfully. Refresh your browser to view post")
            // clear()
        } else {
            setLoading(true)
            dispatch(createPost(values, setLoading, clear))
            setLoading(false)
            alert("Post created successfully. Refresh your browser to view post")
            clear()
        }

    }



    return (
        <div>
            <Navbar>
                <NavLink to="/posts" exact activeClassName="active" className="nav-link">Viewposts</NavLink>
            </Navbar>
            <div className='form-section'>
                <h2>{currentId ? "Editing Post" : "Add a New Post"}</h2>
                <div className='add-form'>

                    <form onSubmit={handleSubmit}>
                        <div className='inputfield-div'>
                            <label htmlFor="name">Post topic</label>
                            <input type="text" name="topic" placeholder="Post topic ...." value={values.topic} required className='inputfield' onChange={handleChange} />
                        </div>
                        <div className='inputfield-div'>
                            <label htmlFor="name">Post Category</label>
                            <select id="category" name="category" className='inputfield' onChange={handleChange} value={values.category} required>
                                <option value="">Select Category</option>
                                <option value="health">Men's Wellness</option>
                                <option value="life">Life</option>
                                <option value="relationship">Relationship</option>
                                <option value="finance">Finance</option>
                                <option value="career">Career</option>
                                <option value="Investment">Investment</option>
                                <option value="religion">Religion</option>
                                <option value="sex">Sex</option>

                            </select>
                        </div>
                        <div className='inputfield-div'>
                            <label htmlFor="name" style={{ paddingBottom: "10px" }}>Post Image</label>
                            {/* <input type="text" name="image" placeholder="Post image..."className='inputfield'   onChange={handleChange}/> */}
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setValues({ ...values, image: base64 })}
                                onChange={values.image}

                            />
                        </div>
                        <div className='inputfield-div'>
                            <label htmlFor="name">Post video</label>
                            <input type="url" name="video" placeholder="Post video..." className='inputfield' value={values.video} onChange={handleChange} />
                        </div>

                        <div className='inputfield-div'>
                            <label htmlFor="name">Post message</label>
                            <ReactQuill
                                required
                                placeholder="Write message ..."
                                modules={Addpost.modules}
                                formats={Addpost.formats}
                                onChange={handleQuillEdit}
                                value={values.message}
                                name="message"
                                className='text-editor'
                            />
                        </div>

                        <div className='inputfield-div'>
                            <label htmlFor="name">Poster Name</label>
                            <input type="text" name="postername" placeholder="Poster name ..." value={values.postername} required className='inputfield' onChange={handleChange} />
                        </div>

                        {loading ?
                            <button type="submit" className='form-btn submitting' style={{ pointerEvents: 'none' }}>
                                <div class="spinner-grow spinner-grow-sm" role="status"></div>
                                <span>Submitting ...</span>
                            </button>
                            :
                            <button type="submit" className='form-btn'>Submit</button>
                        }
                        <button onClick={clear} className="form-btn clear">Clear</button>





                    </form>
                </div>
            </div>
        </div>
    )
}

Addpost.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
        ["code-block"]
    ],
}

Addpost.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "blockquote",
    "list",
    "bullet",
    "code-block",
    "header",
]
export default Addpost
