import React, { useEffect, useState } from 'react'

const Apicall = () => {
    const[count,setCount]=useState([]);
    const[pic,setPic]=useState([])

     useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setCount(json));
  }, []);

    // useEffect(()=>{
    //     fetch("")
    //     .then((response)=>response.json())
    //     .then((json)=> setjam(json));
    // })
    useEffect(()=>{
        fetch(`https://api.slingacademy.com/v1/sample-data/photos/${id}`)
        .then((response)=>response.json())
        .then((json)=>setPic(json));
    })

  return (
    <>
      <div className="container">
        
        {/* {pic.map((data)=>(
            <div className="div" key={data.id}>
            <img src={data.url} alt="" />
            </div>
        ))} */}

        {count.map((user)=>(
            <div className="div" key={user.id}>
             <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        </div>
        ))}
       
      </div>
    </>
  )
}

export default Apicall
