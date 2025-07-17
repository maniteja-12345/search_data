import { useEffect, useState } from 'react'

import './App.css'

function App() {
  let [count, setCount] = useState(0)
  // Here count variable is created just to trigger a Comp re-render when needed
  let [apiData, setApiData] = useState(null)
  let [searchItem, setSearchItem]  = useState('')
  let [filteredQuotes, setFilteredQuotes] = useState(null)
  let [filter, setFilter] = useState(false)

  let availableQuotes =  filter? filteredQuotes : apiData;

  function handleSearch(){
    console.log('search fn renderd')
    let results = apiData.filter(item=>{
      return item.quote.toLowerCase().includes(searchItem.toLowerCase())
    })
    setFilteredQuotes(results)
    setFilter(true)
    // console.log(results)
    // console.log(filteredQuotes)
  }

  function handleClear(){
    console.log('clear fn renderd')
    setFilter(false)
    setSearchItem('') // optional
  }

  useEffect(()=>{
    console.log('useeffect fn renderd')
    const fetchData = async()=>{
      try{
        let res = await fetch('https://dummyjson.com/quotes')
        if(!res.ok){
          throw new Error('error cooured')
        }
        let data = await res.json()
        
        setApiData(data.quotes) 
  // data is an object which contains array 'quotes', so directly assigning the required array to apiData
        
      }
      catch(err){
        console.log(err.message)
      }
    }
    fetchData()
     
  },[])

  if (!apiData) return <h1>Loading quotes...</h1>; //this runs before useEffect hook

  return (
    <>
    <h2>Count:{count}</h2>
    <button onClick={()=>{setCount(count+1)}}>Increment</button>
    <br></br>
    <input onChange={(e)=>{setSearchItem(e.target.value)}} placeholder='Search you quote' value={searchItem}></input>
    <button onClick={handleSearch}>Search</button>
    <button onClick={handleClear}>Clear</button>
      {availableQuotes?.map(item =>{
        return (
          <div key={item.id}>
            <p >{item.quote}</p> 
            <h6>{item.author}</h6>
          </div>
        )
      }) 
      }
      
      
    </>
  )
}

export default App
