const Filter = ({ filterText, handleFilterChange }) => {
    return (
        <div>
            find countries
            <input 
            value={filterText}
            onChange={handleFilterChange}
            />  
        </div>
    )   
  }
  
export default Filter