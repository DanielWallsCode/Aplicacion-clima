import React, { useState } from 'react'

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'a1f60835556efe4784335ae59b8c4251';
  const difKelvin = 273.15

  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null);

  const handleCmabioCiudad = ({target}) => {
    setCiudad(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ciudad.length > 0)fetchClima();
  }

  const fetchClima = async() => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
      console.log(dataClima)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
        <h1>Aplicacion de Clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={ciudad}
                onChange={handleCmabioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>

        {
          dataClima && (
            <div>
              <h2>{dataClima.name}</h2>
              <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
              <p>Condicion Meteorologica: {dataClima.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
            </div>
          )
        }

    </div>
  )
}
