const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]} <br />
      area {country.area} <br /> <br /> 
      <b> languages </b>
      <ul>
        {
          Object.keys(country.languages).map(key =>
            <li key={key}>
              {country.languages[key]}
            </li>)
        }
      </ul>
      <img
        src={country.flags['png']}
        alt={'Country Flag of ' + country.name.common}
        width="150"
        height="150"
      />
    </div>
  )
}

export default CountryInfo