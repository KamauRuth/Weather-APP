import React from 'react'
import './Weather.css'
import search from '../assets/search.png'

const Weather = () => {
  return (
    <div className='Weather'>
        <div className="searchbar">
            <input type='text' placeholder='Search'/>
            <img src={search} alt="" />
        </div>
    </div>
  )
}

export default Weather