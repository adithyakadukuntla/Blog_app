import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { FcReadingEbook } from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
function AdAuthorArticles() {
    const [articlesList, setArticlesList]=useState([]);
    let navigate=useNavigate();
    const [err,setErr]=useState("");
  const {state}=useLocation();
    let token = sessionStorage.getItem('token');

    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    });

    const getArticlesOfUser= async()=>{
        
        let res= await axiosWithToken.get(`http://localhost:5000/author-api/author-profile/author-articles/${state.username}`);
        if(res.data.message==="Articles"){
            setArticlesList(res.data.payload)
        }else{
            setErr(res.data.message)
        }
    }

    const readArticleByArticleId=(articleObj)=>{
        
        navigate(`/author-profile/articles/${articleObj.articleId}`,{state:articleObj})
      }

    useEffect(()=>{
        
    getArticlesOfUser();
    
    },[]);

    function ISOtoUTC(iso) {
        let date = new Date(iso).getUTCDate();
        let day = new Date(iso).getUTCDay();
        let year = new Date(iso).getUTCFullYear();
        return `${date}/${day}/${year}`;
      }
  return (
   <div>    
   {err ?(<p></p>):(<p></p>)}   
    {articlesList.length===0?(
        <p className='fs-3 text-center text-info'>
    No articles Found
    </p> 
     ):(   
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 p-4">
            {articlesList.map((article)=>(
                <div className="col" key={article.articleId}>
                <div className="card h-100 fs-5">
                    <div className="card-header">
                    <p  className='my-auto'><FaRegUserCircle/>  {article.username}</p>
                    </div>
                    <div className="card-body mb-2">
                    
                        <h5 className='card-title ' style={{color:'var(--mid-blue)'}} >{article.title}</h5>
                        <p className="card-text">{article.content.substring(0,100)+"...."}</p>
                        <button className='btn ' style={{ backgroundColor:'var(--light-olive)'}} onClick={()=>readArticleByArticleId(article)} >
                        <FcReadingEbook />  Read More
                        </button>
                        </div>
                        <div className="card-footer">
                            <small className="text-body-secondary">Last updated on {ISOtoUTC(article.dateOfModification)}</small>
                        </div>
                    
                </div>
                </div>
            ))}
        </div>
        )   
         }
        
    
     </div>

)
}
export default AdAuthorArticles