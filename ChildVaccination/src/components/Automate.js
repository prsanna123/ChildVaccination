// import React,{useEffect,useContext} from 'react';
// import messageContext from '../context/messageContext';
// import Chil from './child';
// const Automate =() =>{
//   console.log("hi")
//   const context=useContext(messageContext)
//   const {Ans}=context;
//   useEffect(() => {
//     Ans();
//     // eslint-disable-next-line
// }, [])
//     const handleSubmit=async (e) => {
//         e.preventDefault();
      
//     }
    
//   return (
//     <div>
//       <h1>hi</h1>
//         <form onSubmit={handleSubmit}>
//         <button type="submit">
//             submit
//         </button>
        
//         </form>
//         < div className='row my-3'>
         
          
          
//           {/* <div>
//           {
//             data.map((j)=>{
//               return <Chil info={j}/>
//             })
//           }
//           </div> */}
//           <h2>Children data</h2>
//         </div>

//     </div>
//   );
// };

// export default Automate;


import React,{useContext,useEffect,useState} from 'react'
// import noteContext from "../context/notes/noteContext"
import {Link} from "react-router-dom"

export default function Student(userData) {
    const [data,setData]=useState([]);
    useEffect(()=>{
      fetch("http://localhost:5000/api/child/getchilddata",{
        method:"GET",
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log("at 59")
        console.log(data);
        setData(data);
      });
    },[]);
    return (
      <div>
        <div className="container">
            <h1> u are in my info</h1>
              <div className="col-6">
                {/* {
                  data.map((data,i)=>
                  <li key={i}>{data}</li>)
                } */}
                
      {data.map(i=>{
        return(
          <div>
          <div className="row">
          <div className="card">
       <i className="fa fa-user-o fa-10x mt-2" aria-hidden="true" ></i>
        <div className="card-body">
        <h5 className="card-title">Student Detail</h5>
        <p className="card-text">{i._id}</p>
        <p className="card-text">{i.parent_name}</p>
        <p className="card-text">{i.phone_num}</p>
        <p className="card-text">{i.birth_date}</p>
      </div>
    </div>
    </div>
    
    </div>
        )
      })}
      <Link to="/wel">
        <button>back</button>
      </Link>
      </div>
    </div>
    </div>
  )
}