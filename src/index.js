import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import WeatherIcon from 'react-icons-weather';


const API_KEY = 'b5f7f588128701edab6bc2ed20e41b06'
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q='

class Search extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    query :'',
    results : []
  }
}

getWeather= () => {
    const city = this.state.query
    axios.get(API_URL+city+"&appid="+API_KEY)
    .then(response =>{
      //console.log(response.data)
    //  const xml = new XMLParser().parseFromString(response.data);
    //  const result=xml.getElementsByTagName('time')
      console.log(response.data)
      this.setState ({
        results : response.data.list
      })
    })
  }

  handleInputChange = () => {
    this.setState({
      query : this.search.value
    }, () => {
    if (this.state.query && this.state.query.length > 4) {
         this.getWeather()
     }
     else {
       this.setState({
         result : []
       })
     }
   })
 }

  render() {
  const city = this.state.query
   const result = this.state.results.map( (res,i) => {
     const des = res.weather[0].id
     return (
       <div key={i}>
       <h1>{res.dt_txt}</h1>
       <WeatherIcon name="owm" iconId={des} flip="horizontal" rotate="90" />
       <p>Temperature: {res.main.temp}</p>
       <p>Humidity: {res.main.humidity}</p>


       </div>
     )
   });

   //console.log(xml);
   //console.log(xml.getElementsByTagName('Name'))

  return (
  <div>
  <form>
       <input
         className = "search-field"
         placeholder="Search for city..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
     </form>
     <div className='results'>
     <h1>The weather in {city}</h1>
    <div className='icons'>
     {result}
     </div>
    </div>
  </div>
)}
}

ReactDOM.render(<Search />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
