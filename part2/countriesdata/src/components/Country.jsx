import CountryInfo from './CountryInfo'

// const handleClick = () => {
//   console.log('Clicked')
// }

const Country = ({ country, handleClick }) => {
    return (
      <div>
        {country.name.common}
        <button onClick={() => handleClick(country)}>
          show
        </button>
      </div>
    )
  }
  
  export default Country