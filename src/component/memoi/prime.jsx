import React ,{useState,useMemo} from 'react'

const prime = () => {
    const[number,setNumber]=useState(0);

    const calculate=(num)=>{
        if(num%2==0){
            return "non-prime";
        }
        else{
            return "prime";
        }
    }
  return (
    <>
      <h2>Prime Number Checker</h2>
      <h3>Enter a number: </h3>
      <input type="number" name="" id="" />
    </>
  )
}

export default prime
