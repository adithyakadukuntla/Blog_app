// AddArticle.js
import "./css/signup.css";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

let {currentUser}=useSelector((state)=>state.userLogin);
let [err,setErr]=useState("");
let navigate=useNavigate();

let token=sessionStorage.getItem('token');

const axiosWithToken= axios.create({
  headers:{Authorization : `Bearer ${token}` }, 
 });


  const handleArticlePost=async (newArticle) =>{

    newArticle.articleId=Date.now();
    newArticle.dateOfCreation=new Date();
    newArticle.dateOfModification=new Date();
    newArticle.username=currentUser.username;
    newArticle.comments=[];
    newArticle.status=true;
    /// make HTTP POST req to author api
    let res= await axiosWithToken.post('/author-api/add-article',newArticle);
    console.log("res",res);
    
    if(res.data.message==='New article added'){
      navigate(`/author-profile/author-articles/${currentUser.username}`)
    }else{
      setErr(res.data.message);
    }
  }

  return (
    <div className="row justify-content-center mt-4 ">
    <div className="col-lg-6 col-md-6 col-sm-6">
        <div className="card neu mx-auto  ">
          <div className="card-title text-center border-bottom p-2">
            <h3>Write Article</h3>
          </div>
          {err.length!==0&&<p className="text-center fs-5" >{err}</p>}
          <div className="card-body">
          <form className="form p-4" onSubmit={handleSubmit(handleArticlePost)}  encType="multipart/form-data">
            <label htmlFor="" className="form-label">
              Title
            </label>
            <input
              type="text"
              name=""
              id="title"
              className="form-control"
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
              {...register("category", { required: true })}
            />
            {errors.category?.type === "required" && (
              <p className="text-danger lead fs-5">
                select a category for your blog
              </p>
            )}
            <label htmlFor="">Image</label>

<input type="file" name="image" {...register("image", { required: true })} />
{errors.image && <p className="text-danger lead fs-5">Image is required</p>}
            <label htmlFor="" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              name=""
              rows="6"
              id="content"
              className="form-control"
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
                Publish
              </button>
            </div>
            </form>
          </div>
        </div>
   
    </div>
    </div>
  );
}

export default AddArticle;  