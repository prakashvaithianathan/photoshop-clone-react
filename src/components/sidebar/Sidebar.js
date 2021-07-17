import React from 'react'
import './Sidebar.css'

const Sidebar = ({index,name,active,handleClick}) => {
    return (
        
        <button className={`btn item ${active ? 'active' :null}`} key={index} onClick={handleClick}>{name}</button>
        
    )
}

export default Sidebar
