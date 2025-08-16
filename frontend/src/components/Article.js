import React, { useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import { FcPlanner } from "react-icons/fc";
import { MdRestore } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import { FcClock } from "react-icons/fc";
import { MdOutlineArrowBackIos } from "react-icons/md";
  

import axios from 'axios'
function Article() {
  let {currentUser}=useSelector((state)=>state.userLogin);
  let {register,handleSubmit,formState: { errors }} = useForm();
  const  {state}=useLocation();
  const navigate=useNavigate();
  const [commentStatus,setCommentStatus]=useState('');
  const [err,setErr]=useState('')
  const [editStatus,setEditStatus]=useState(false)
  const [editedAr,setEditedAr]=useState(state)
  const [arDRStatus,setArDRStatus]=useState(state.status)
  let token=sessionStorage.getItem('token');
   const axiosWithToken=axios.create({
      headers:{ Authorization:`Bearer ${token}`}
  })

const editArticle=()=>{
  setEditStatus(true)
}
const saveArticle=async(editedArticle)=>{
  const modifiedArticle={...state, ...editedArticle}
  delete modifiedArticle._id;
  modifiedArticle.dateOfModification=new Date();
// make http put 

let res=await axiosWithToken.put(`/author-api/article`,modifiedArticle);
if(res.data.message==='Article modified'){
  setEditStatus(false)
  setEditedAr(res.data.payload)
  navigate(`/author-profile/articles/${state.articleId}`,{state:res.data.payload})
}

}

const postComment=async(commentObj)=>{
  commentObj.username=currentUser.username;
  const res=await axiosWithToken.post(`/user-api/comment/${state.articleId}`,commentObj);
  if(res.data.message==='comment posted'){
    setCommentStatus(res.data.message)
  }else{
    setErr(res.data.message)
  }
console.log(commentObj)
}

const deleteArticleById=async()=>{
  let copy={...editedAr}
  delete copy._id;
  let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,{copy})
  if(res.data.message==='article deleted'){
    setArDRStatus(false);
  }else{
    setErr(res.data.message);
  }
}
const restoreArticleById=async()=>{
  let copy={...editedAr}
  delete copy._id;
  let res=await axiosWithToken.put(`/author-api/article/${copy.articleId}`,{copy})
  if(res.data.message==='article restored'){
    setArDRStatus(true);
  }else{
    setErr(res.data.message);
  }
}

function goBack() {
  window.history.go(-1); // This navigates back by one step in the history
}

function ISOtoUTC(iso) {
  let date = new Date(iso).getUTCDate();
  let day = new Date(iso).getUTCDay();
  let year = new Date(iso).getUTCFullYear();
  return `${date}/${day}/${year}`;
}


  return (
  <div className='container'>
    {
      editStatus===true?(
        <div className="card neu mx-auto mt-3  ">
          <div className="card-title text-center border-bottom p-2">
            <h3>Edit Article</h3>
          </div>
          {err.length!==0&&<p className="text-center fs-5" >{err}</p>}
          <div className="card-body">
          <form className="form p-4" onSubmit={handleSubmit(saveArticle)}>
            <label htmlFor="" className="form-label">
              Title
            </label>
            <input
              type="text"
              name=""
              id="title"
              className="form-control"
              defaultValue={state.title}
              {...register("title", { required: true })}
            />
            {errors.title?.type === "required" && (
              <p className="text-danger lead fs-5">
                Select a title for the blog
              </p>
            )}

            <label htmlFor="" className="form-label">
              Category
            </label>
            <input
              type="text"
              name=""
              id="category"
              defaultValue={state.category}
              {...register("category", { required: true })}
            />
            {errors.category?.type === "required" && (
              <p className="text-danger lead fs-5">
                select a category for your blog
              </p>
            )}
            <label htmlFor="" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              name=""
              rows="6"
              id="content"
              className="form-control"
              defaultValue={state.content}
              {...register("content", { required: true })}
            />
            {errors.content?.type === "required" && (
              <p className="text-danger lead fs-5">Content is required</p>
            )}

            <div className=" d-flex justify-content-end pt-2">
              <button
                className="btn"
                style={{ color: "var(--light-orange)" }}
                type="submit"
              >
                Save
              </button>
            </div>
            </form>
          </div>
        </div>
      ):(
    <>
    <div className='pt-3'>
         <button className="btn" onClick={goBack} > <MdOutlineArrowBackIos className='fs-5' /> </button>
        </div>
      <div className="d-flex justify-content-between mt-3 p-4">
        
        <div>
          <p className='display-5 me-4'>{editedAr.title}</p>
          <span className='py-3'>
            <small className='text-secondaryt me-4'>
              <FcPlanner/>  Created on: {ISOtoUTC(editedAr.dateOfCreation)}
            </small>
            </span>
            <span>
            <small className='text-secondaryt me-4'>
             <FcClock/>  Modified on: {ISOtoUTC(editedAr.dateOfModification)}
            </small>
          </span>
        </div>
      <div>
       {currentUser.userType==='author'&&(
        < >
        <button className="btn btn-warning me-2" onClick={editArticle} >
          <BiEditAlt/>
          </button>
          {arDRStatus===true? <button className="btn btn-danger me-2" onClick={deleteArticleById}>
          <MdDelete/>
          </button>:
           <button className="btn btn-success me-2" onClick={restoreArticleById}>
           <MdRestore />
           </button>
           }
         
         
          </>
       )}
      </div>
      </div>
      <p className="lead mt-3 pt-1" style={{whiteSpace:'pre-line'}} >{editedAr.content}</p>
      
      <div className="comments my-4 bg-light p-2  border-1 ">
        {state.comments.length===0 ?(
          <p className='lead fs-3 pt-4 border-black '>No comments Yet...</p>
        ):(
          
        state.comments.map(comment=>{
          <div>
            <hr />
          <h4>Comments:</h4>
          </div>
            return <div className='my-auto p-2'>
             <p className='my-auto mt-1'><b><FcBusinessman/>   {comment.username}</b></p>
              <p className='lead me-1 '> <FcComments/>  {comment.comment}</p>
              <hr />
             
            </div>
          })
        )}
      </div>

      
      <div>
          <h5>{commentStatus}</h5>
        {currentUser.userType==='user'&&(
          <form onSubmit={handleSubmit(postComment)} >
            <input type="text" className='form-control mb-4' {...register('comment',{required:true})} />
            {errors.comment?.type==='required'&&(<p className='text-danger fs-5 lead'>Comment is required</p>)}
            <button className="btn btn-success" type='submit' >
              Add a comment
            </button>
          </form>
        )}
      </div>
      </>
      )}
      </div>
  )
}

export default Article

 