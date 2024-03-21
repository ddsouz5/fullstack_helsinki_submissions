import ReactDOM from 'react-dom/client'

import App from './App.jsx'

const COUNTRIES = [
    {name: {common: "Kuwait", official: "State of Kuwait"} },
    {name: {common: "Austria", official: "Republic of Austria"} }
  ]

ReactDOM.createRoot(document.getElementById('root')).render(
<App countries={COUNTRIES}/>
)
