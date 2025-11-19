import React from 'react'
import { useMemo } from 'react';
import { useState } from 'react'

const Double_number = () => {
    const [number,setNumber]=useState(0);

    const calculate=(num)=>{
        console.log("re-runs");
       const double=num*2;
       const sqr=num*num;
       const cub=num*num*num;
        return {double,sqr,cub} ;
    }

    const computedValue=useMemo(()=>calculate(number),[number]);

  return (
    <>
    <h3>Enter number</h3><input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        className="border p-2 rounded"
        placeholder="Enter a number"
      />
       <h3>Double: {computedValue.double}</h3>
      <h3>Square: {computedValue.sqr}</h3>
      <h3>Cube: {computedValue.cub}</h3>
    </>
  )
}

export default Double_number
