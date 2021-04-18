import { authorizationKey, URL } from "./constants"
import './App.css';
import { useEffect, useState } from 'react';
import icontemp from "./gallery/icons/temp.png";
import iconwind from "./gallery/icons/wind.png";
import iconhum from "./gallery/icons/humidity.png"



const dataRow = (icon, descrip, val, mu = "") => {
  return (
    <div className="dataInfo">
      <div className="data">
        {icon}{descrip}
      </div>
      {val}{mu}
    </div>
  )
}

const kelvinToCentigrade = (kelvin) => kelvin - 273.15
const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

function App() {

  const [data, setData] = useState()

  const getData = async () => {
    fetch(URL, {
      headers: {
        Authorization: authorizationKey
      }
    }).then(res => res.json())
      .then(data => setData(data))
  }

  useEffect(() => {
    if (!data) {
      getData()
    }
  }, [data])

  let weatherEstate = data?.weather[0].main
  if (weatherEstate==="Clouds") weatherEstate = "Nublado"

  return (
    <div className="card">
      <div className="card-image">
        <div className="city">
          {data?.name || "No City"}
        </div>
        <div className="date">
          {date}
        </div>
        <div className="temp">
            {kelvinToCentigrade(data?.main.temp)}°
        </div>
        <div className="Text-Weather">
            Clima / {weatherEstate} 
        </div>
      </div>


      <div className="frameInfo">

        {dataRow(<img alt="icono" src={icontemp} className="icon" />, "Temperatura", kelvinToCentigrade(data?.main.temp), " °")}
        {dataRow(<img alt="icono" src={iconhum} className="icon" />, "Humedad", (data?.main.humidity), " %")}
        {dataRow(<img alt="icono" src={iconwind} className="icon" />, "Velocidad Viento", (data?.wind.speed), " m/s")}

      </div>
    </div>


  );
}

export default App;
