import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


function AdUsersDetails()  {
let [usersList,setUsersList]=useState([])
const [err,setErr]=useState('')

const navigate=useNavigate();

let token=sessionStorage.getItem('token');
const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
})


const blockuser=async(userObj)=>{
    
    
    let res=await axiosWithToken.put(`/user-api/${userObj.username}`,{userObj})
    if(res.data.message==='User Blocked'){
        //setAuthorStatus(false)
        navigate('/admin-profile/users')
    }
    
}
const activateUser=async(userObj)=>{
    
    let res=await axiosWithToken.put(`/user-api/${userObj.username}`,{userObj})
    if(res.data.message==='User Activated'){
        //setAuthorStatus(true)
        navigate('/admin-profile/users')
    }
    
}

const getAllUsers=async()=>{
   
    const res=await axiosWithToken.get(`/user-api/user-details`)
    if(res.data.message==='All Users'){
        setUsersList(res.data.payload)
    }else{
        setErr(res.data.message)
    }
   
}

useEffect(()=>{
    getAllUsers();
    
},[])


  return (
    <div className='container p-1'> 
    {usersList.length!==0 ?(
 <table class="table table-light table-bordered  table-hover  w-75 mx-auto pb-2 mt-3 border-black  text-center">        <thead>
            <tr>
                <th>Authors</th>
                <th>Author Status</th>
                
            </tr>
        </thead>
        <tbody className='p-1'>
       {
        usersList.map((userObj,index)=>(
            
            <tr key={index}>
                <td>{userObj.username}</td>
                {
                    userObj.status===true? 
                    <td className='me-5'> <button className='btn btn-danger' onClick={()=>blockuser(userObj)}>Block</button></td>
                    :
                    <td className='me-5'><button className="btn btn-success" onClick={()=>activateUser(userObj)}>Activate</button></td>
                }
            </tr>
        ))
       }
       </tbody>
       </table>
       ):(
        <p className='text-danger text-center fs-4'>No Users Found</p>
       )}
    </div>
  )
}
export default AdUsersDetails