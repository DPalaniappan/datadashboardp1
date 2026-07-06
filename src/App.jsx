import { useState, useEffect } from 'react'
import Card from './components/Card.jsx'
import List from './components/List.jsx'
import NavBar from './components/NavBar.jsx'
import axios from 'axios'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
    try{
    const urlBase = "https://api.restcountries.com/countries/v5?response_fields=names,codes,coordinates,classification,uuid,flag,population,region,capitals,area&limit=100";
    const [page1, page2, page3] = await Promise.all([
      axios.get(`${urlBase}&offset=0`, { headers: { 'Authorization': `Bearer ${API_KEY}` } }),
      axios.get(`${urlBase}&offset=100`, { headers: { 'Authorization': `Bearer ${API_KEY}` } }),
      axios.get(`${urlBase}&offset=200`, { headers: { 'Authorization': `Bearer ${API_KEY}` } })
    ]);
    const page1Data = page1.data?.data?.objects
    const page2Data = page2.data?.data?.objects
    const page3Data = page3.data?.data?.objects
    const DataList = [...page1Data, ...page2Data, ...page3Data]
    const countryList = DataList.filter((item) => item.classification?.dependency == false)
    console.log(countryList)
    setList(countryList);
   }catch (error) {
    console.error('Error fetching data:', error);
   } finally {
    setLoading(false);
   }
  }
    fetchData()
  }, [])
  const avgPopulation = list.reduce((acc, item) => acc + item.population, 0) / list.length
  const avgArea = list.reduce((acc, item) => acc + item.area.kilometers, 0) / list.length

  return (
    <div className="App-Page">
      <NavBar/>
      <div className="App-content">
        <div className="App-row">
          <Card isLoading={loading} stat={list.length} info={"Total Amount of Countries"} />
          <Card isLoading={loading} stat={Math.round(avgPopulation).toLocaleString()} info={"Average Population"} />
          <Card isLoading={loading} stat={Math.round(avgArea).toLocaleString()} info={"Average Area in km"} />
        </div>
        <div className="App-row">
          <List key={loading ? 'loading' : 'loaded'} data={list} isLoading={loading} />
        </div>
      </div>
    </div>
  )
}

export default App
