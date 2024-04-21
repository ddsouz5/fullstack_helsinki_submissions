const Notification = ({ message }) => {
  //console.log(message)
    if (message === null) {
      return null
    }
    else if (message.includes('removed')) {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
    else if (message.includes('validation')) {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }  
    else if (message.includes('Validation')) {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }  
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

export default Notification
