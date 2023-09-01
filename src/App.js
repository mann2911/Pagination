import {useCallback, useEffect,useState} from 'react';
import './App.css'
import Counter from './Counter';
function App() {

  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const [count,setCount]=useState(0);

  // api call

  useEffect(() => {
    fetchData()
  },[])

  const fetchData=async () => {
    const res=await fetch('https://dummyjson.com/products');
    const data=await res.json();
    // console.log(data)
    if(data&&data.products) {
      setData(data.products);
    }
  }

  const selectPagehandler=(selectPage) => {
      setPage(selectPage)
  }

  const incrementCounter = useCallback(()=>{
    setCount(count+1)
  },[count])

  // const incrementCounter = ()=>{
  //   setCount(count+1)
  // }
  
  console.log("pagination page called")


  /* 
  
  
    The problem is : Let's say there is one component like counter which we had added along with our pagination component;

    Now when we use pagination (goes from one page to another) then the counter component is also geeting render.

    Real life senario : instead of counter component, we do have addToCart component and every time while we use pagination it will render.
    so to avoid that we need to use useCallback in this.
  

    Solution :
    we need to optimize our app so we would do following steps.

    1. React.memo in counter component ->
       what is React.memo -> React.memo is used to memoize entire components based on their props, preventing re-renders when props haven't changed.

      -> so by using this we would prevent the re-rendering. but there is one problem
      we are passing 2 props (count,incrementCounter) -> so by using memo we will prevent the state variable but every time app.js render it will make a new copy of incrementCounter. so the issue will still persist due to that.

     2. -> so now we need to optimize the function calling also.
      we will do that using useCallback -> useCallback is to prevent unnecessary re-creations of callback functions

      pl see the useCallack hook in line 29.

    3. useMemo (not used in current implementation) is used to memoize the result of a computation or calculation within a component and allows you to specify dependencies for when the memoized value should be recalculated.
        bascially when a function takes more time to perform than we can use useMemo and call whenever it needed.
        eg there is one long listing of data in one part in this page. we do not need to recalculate when we do pagination, then we will wrap it with useMemo.
    */











  return (
    <>
      <div className='counter'>
        <Counter incrementCounter={incrementCounter} count={count}/>
      </div>
      <br />
      <hr />

      <div className='products'>
        {
          data.slice(page*5-5,page*5).map((item) => (
            <span className='product__single' key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          ))
        }
        <br />
      </div>
      <div>
        {
          data.length>0&&<div className='pagination'>
            <span onClick={() => selectPagehandler(page-1)} className={page>1? " ":"pagination__disable"}> prev </span>
            {
              [...Array(data.length/5)].map((_,index) => (
                <span key={index} className={page===index+1? "pagination__selected":""} onClick={() => selectPagehandler(index+1)}> {index+1}</span>
              ))
            }
            <span onClick={() => selectPagehandler(page+1)} className={page<data.length/5? " ":"pagination__disable"}> next </span>
          </div>
        }
      </div>
    </>
  );
}

export default App;
