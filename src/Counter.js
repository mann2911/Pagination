import React, {useState} from "react";

export default function Counter({count,incrementCounter}) {
   console.log("counter compoenent render")
   
  return (<div>Counter is  {count}<br /><button onClick={incrementCounter}>Click here to incremenet counter</button></div>)
}
