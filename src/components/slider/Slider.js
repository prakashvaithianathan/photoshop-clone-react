import React from 'react'
import './Slider.css'

const Slider = ({min,max,val,sliderChange}) => {

    return (
        <div className='slider'>
            <input type="range" min={min} max={max} value={val} onChange={sliderChange} />
            </div>
    )
}

export default Slider
