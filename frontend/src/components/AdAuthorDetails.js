import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
function AdAuthorDetails() {
let [authorsList,setAuthorsList]=useState([])
const [err,setErr]=useState('')

const navigate=useNavigate();

let token=sessionStorage.getItem('token');
const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
})


const blockAuthor=async(authorObj)=>{
   
    let res=await axiosWithToken.put(`/author-api/${authorObj.username}`,{authorObj})
    if(res.data.message==='Author Blocked'){
        //setAuthorStatus(false)
        navigate('/admin-profile/authors')
    }
    
}
const activateAuthor=async(authorObj)=>{
    
    let res=await axiosWithToken.put(`/author-api/${authorObj.username}`,{authorObj})
    if(res.data.message==='Author Activated'){
        //setAuthorStatus(true)
        navigate('/admin-profile/authors')
    }
    
}

const getAllAuthors=async()=>{
   
    const res=await axiosWithToken.get(`/author-api/author-details`)
    if(res.data.message==='All Authors'){
    setAuthorsList(res.data.payload)
    }else{
        setErr(res.data.message)
    }
   
}

const authorArticles=async(authorObj)=>{
    
     const res=await axiosWithToken.get(`/author-api/author-articles/${authorObj.username}`)
     if(res.data.message==='Articles'){
        navigate(`/admin-profile/authors/articles`,{state:authorObj})
    }
}

useEffect(()=>{
    getAllAuthors();
    
},[])


  return (
    <div>
    <div className='container p-1'> 
    {authorsList.length!=0 ?(
         <table class="table table-light table-bordered  table-hover  w-75 mx-auto pb-2 mt-3 border-black  text-center">
        <thead>
            <tr>
                <th>Authors</th>
                <th>Author Status</th>
                
            </tr>
        </thead>
        <tbody className='p-1'>
       {
        authorsList.map((authorObj,index)=>(
            
            <tr key={index}>
                <td><Link  onClick={()=>authorArticles(authorObj)} >{authorObj.username}</Link></td>
                {
                    authorObj.status===true? 
                    <td className='me-5'> <button className='btn btn-danger' onClick={()=>blockAuthor(authorObj)}>Block</button></td>
                    :
                    <td className='me-5'><button className="btn btn-success" onClick={()=>activateAuthor(authorObj)}>Activate</button></td>
                }
            </tr>
        ))
       }
       </tbody>
       </table>
       ):(
        <p className='text-danger text-center fs-4'>No Authors Found</p>
       )}
    </div>
    <Outlet/>
    </div>
  )
}

export default AdAuthorDetails