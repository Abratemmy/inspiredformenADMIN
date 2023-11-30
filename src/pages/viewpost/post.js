import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost } from "../../actions/posts";
import moment from "moment"
import "./post.css"
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { IoIosAlert } from 'react-icons/io'
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';

function Post({ currentId, setCurrentId, posts }) {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const addNewPost = () => {
    setCurrentId(null)
    navigate('/addpost')
  }

  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 10
  const postVisited = pageNumber * postPerPage


  const pageCount = Math.ceil(posts?.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    // this is to scroll up when 
    window.scrollTo(0, 0)
  }

  // console.log(Object.keys(posts.usercomment).length);


  const [popupContent, setPopupContent] = useState([])
  const handleDeleteAlert = (post) => {
    setShowAlert(true);
    setPopupContent(post)
  }

  console.log('popup', popupContent)
  useEffect(() => {
    if (showAlert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAlert])

  return (
    <div className=''>
      {!posts?.length ? <div className="loading" style={{ paddingBottom: "30px" }}></div> : (
        <div>
          <Navbar>
            <div exact activeClassName="active" style={{ cursor: 'pointer' }} onClick={addNewPost} className="nav-link">Add New Post</div>
          </Navbar>

          <div className='postContainer'>
            <div className='scroll-container'>
              <div className='post-content '>
                <table className='scroll'>
                  <tbody>
                    <tr>
                      <th>S/N</th>
                      <th>Poster Name</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Comment</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>

                    {/* .sort((a, b) => moment(new Date(b.createdAt))- moment(new Date(a.createdAt))) */}
                    {posts.sort((a, b) => moment(new Date(b.id)) - moment(new Date(a.id))).slice(postVisited, postVisited + postPerPage).map((post, i) => (
                      <tr key={i}>
                        <td className='serial'>{postPerPage * (pageNumber) + i + 1}</td>
                        <td className='name'>{post.postername}</td>
                        <td className='post-topic'>{post.topic}</td>
                        <td className='category'>{post.category}</td>
                        <td className='counter'>{(post.usercomment).length}</td>
                        <td className='date'>
                          {moment(post.createdAt).format("MM")} {moment(post.createdAt).format("Do")}, {moment(post.createdAt).format("YYYY")}</td>
                        <td className='action'>
                          <div className='tableAction'>
                            <NavLink to="/addpost">
                              <button onClick={() => setCurrentId(post._id)} className="edit">Edit</button>
                            </NavLink>

                            <button onClick={() => handleDeleteAlert(post)} className="delete">Delete</button>
                          </div>

                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              activeClassName={"paginationActive"}
              disabledClassName={"paginationDisabked"}
            />
          </div>
        </div>
      )}

      {showAlert && (
        <div className="popupContainer">
          <div className="messageStatusBody" onClick={(e) => e.stopPropagation()}>
            <div className="image">
              <IoIosAlert className="icon" />
            </div>
            <div className="text">Are you sure you want to delete <span>{popupContent.postername} post?</span></div>
            <div className="popaction">
              <span onClick={() => setShowAlert(false)} className='span'>No</span>
              <button className='span delete ' onClick={() => dispatch(deletePost(popupContent._id, setLoading, setShowAlert))} disabled={loading}>{loading ? 'Yes..' : 'Yes'}</button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}


export default Post