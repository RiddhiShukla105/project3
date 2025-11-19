import React,{useState} from 'react'
import { useCallback } from 'react';

const Callback = () => {
    const[count,setCount]=useState(0);
    const[text,setText]=useState("");
    const increment=useCallback(()=>{
        setCount((prev)=>prev+1);
    },[]);

  return (
    <>
      <h2>Count:{count}</h2>
      <button onClick={increment}>Increment</button>
      <br/><br/>
      <input type="text" name="" id="" value={text} 
        onChange={(e)=>setText(e.target.value)}
        placeholder='Type Something...'
      />
        <p>You Typed: {text}</p>
    </>
  )
}

export default Callback
