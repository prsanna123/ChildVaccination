
import {useState} from "react";
import  MessageContext from "./messageContext";

const MessageState=()=>{
  const initial=[]
    const [Data,setdata]=useState(initial);
    const Ans = async()=>{
      // const [dat,setData]=useState([]);
        const resp=await fetch(`http://localhost:5000/api/child/getchilddata`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });

       const dat=await resp.json()
       setdata(dat);
       console.log(Data);
       console.log("done")
    }
    return (
        <MessageContext.Provider value={{Data,Ans}}>
          
        </MessageContext.Provider>
    )
}
export default MessageState;
