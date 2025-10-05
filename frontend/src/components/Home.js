import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FcReadingEbook } from "react-icons/fc";
import { FaRegUserCircle }from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
function Home() {
  let { loginStatus } = useSelector((state) => state.userLogin);
let [articlesList ,setArticlesList]=useState([]);
const [err,setErr]=useState("")
const [loading, setLoading] = useState(true);
let navigate=useNavigate()
  const readArticleByArticleId=()=>{
        if(loginStatus===false){
          alert('Please Login To View the articles...')
        }
    navigate('/signin')
  }
  const getHomeArticles=async()=>{
    console.log('Get articles')
    let res=await axios.get('/author-api/all-articles')
    if(res.data.message==='all articles'){
      setArticlesList(res.data.payload);
    }else{
      setErr(res.data.message)
    }
  }
  useEffect(()=>{
    try{
    getHomeArticles();
    }finally{
      
        setLoading(false)
      
    }
  },[]);
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }
  return (

    <div>
      {loading ? (
        <Loader /> 
      ) : articlesList.length === 0 ? (
        
        <p className='fs-3 text-center text-info'>
          No articles Found
        </p>
      ) : (
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 p-4">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100 fs-5">
                <div className="card-header">
                  <p className="my-auto"><FaRegUserCircle /> {article.username}</p>
                </div>
                <div className="card-body mb-1">
                  <h5 className='card-title ' style={{ color: 'var(--mid-blue)' }}>{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 100) + "...."}</p>
                  <button className='btn' style={{ backgroundColor: 'var(--light-olive)' }} onClick={() => readArticleByArticleId(article)}>
                    <FcReadingEbook /> Read More
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Last updated on {ISOtoUTC(article.dateOfModification)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>


  );
}

export default Home;


// {/* <div>       
//   {loading ?():(
  
//     {articlesList.length===0?(
//         <p className='fs-3 text-center text-info'>
//     No articles Found
//     </p> 
//      ):(   
//         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-4 p-4">
//             {articlesList.map((article)=>(
//                 <div className="col" key={article.articleId}>
//                 <div className="card h-100 fs-5">
//                 <div className="card-header">
//                     <p className="my-auto"><FaRegUserCircle/>  {article.username}</p>
//                     </div>
//                     <div className="card-body mb-1">
//                         <h5 className='card-title ' style={{color:'var(--mid-blue)'}} >{article.title}</h5>
//                         <p className="card-text">{article.content.substring(0,100)+"...."}</p>
//                         <button className='btn ' style={{ backgroundColor:'var(--light-olive)'}} onClick={()=>readArticleByArticleId(article)} >
//                         <FcReadingEbook />  Read More
//                         </button>
//                         </div>
//                         <div className="card-footer">
//                             <small className="text-body-secondary">Last updated on {ISOtoUTC(article.dateOfModification)}</small>
//                         </div>
                    
//                 </div>
//                 </div>
//             ))}
//         </div>
//         )   
         
//         )}
//        </div> 
    
//          */}