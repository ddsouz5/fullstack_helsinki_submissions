import { useState, useEffect } from 'react'
import Country from './components/Country'
import CountryInfo from './components/CountryInfo'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  // const [showCountry, setShowCountry] = useState(true)

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  // console.log('render', countries.length, 'countries')

  const countriesToShow = filterText === ''
  ? []
  : countries.filter(country =>
    country.name.common.toLowerCase().includes(filterText.toLowerCase()))
  
  // const countriesToShow = 
  // countriesFiltered.length === 0 ? ''
  // : countriesFiltered.length > 1 && countriesFiltered.length <= 10 ? countriesFiltered
  

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilterText(event.target.value)
  }

  const handleClick = (country) => {
    // console.log('Clicked')
    <CountryInfo key={country.name.common} country={country} />
  }

  return (
    <div>
      <Filter
        showAll={filterText}
        handleFilterChange={handleFilterChange}
      />
      {
        countriesToShow.length > 10 ? 'Too many matches, specify another filter'
        : countriesToShow.length === 1 ? countriesToShow.map(country => 
        <CountryInfo key={country.name.common} country={country} />
        )
        : countriesToShow.map(country => 
        <Country key={country.name.common} country={country} handleClick={handleClick}/>
        )
      }
    </div>
  )
  }

export default App