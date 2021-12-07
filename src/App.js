import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Table from './Table';

function App() {

  const [isLoading, setisLoading] = useState(true)
  const [data, setdata] = useState([])
  const [displayData, setdisplayData] = useState([])
  const [error, seterror] = useState("")
  const [allChecked, setallChecked] = useState(false)
  const pageNumber = useRef(1)

  const selectAll = (e) => {

    const newData = data.map(d => ({ ...d, checked: e.target.checked }))
    setallChecked(e.target.checked)
    setdata(newData)
  }

  const handleChange = (e, selectedData) => {

    const newData = data.map(d => {
      if (d.id == selectedData.id) {
        return { ...d, checked: e.target.checked }
      }
      return d
    })

    setdata(newData)
    setallChecked(false)
  }

  function getMoreData() {

    //get more batch of data
    const d = data.slice((pageNumber.current * 50), (2 * pageNumber.current * 50))
    const h = displayData.concat(d)
    pageNumber.current += 1

    setdisplayData(h)

  }

  const handleScroll = (e) => {

    if (window.innerHeight + document.documentElement.scrollTop > (document.scrollingElement.scrollHeight - 1000)) {
      getMoreData()
    }

  }


  useEffect(() => {


    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(res => {

        const modifiedRes = res.map(r => {
          return { ...r, "checked": false }
        })

        const displayData = modifiedRes.slice(0, 50)

        setdisplayData(displayData)
        setdata(modifiedRes)
        setallChecked(false)
        setisLoading(false)
      })
      .catch(error => {
        console.log(error)
        setisLoading(false)
        seterror("Something went wrong")
      })

  }, [])

  useEffect(() => {

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return (

    <div className="App">
      {
        isLoading ? <p>LOADING DATA</p>
          : error ? <p>Something went wrong</p>
            : <Table data={displayData} checkAll={allChecked} handleSelectAll={selectAll} handleRowClick={handleChange} />
      }
    </div>
  );
}

export default App;
