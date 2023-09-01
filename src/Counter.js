import React, {memo} from "react";

function Counter({count,incrementCounter}) {
   console.log("counter compoenent render")
   
  return (<div>Counter is  {count}<br /><button onClick={incrementCounter}>Click here to incremenet counter</button></div>)
}

export default memo(Counter)