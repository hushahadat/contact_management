import React from 'react'
import { useNavigate } from 'react-router-dom'
import  "./index.scss"

export const NavBar = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div >
          <div ><p onClick={()=>navigate('/')} style={{color : '#FFFF', cursor :'pointer'}}>Contact</p> <hr class="solid" /></div>
          <div ><p onClick={()=>navigate('/chart-map')} style={{color : '#FFF', cursor :'pointer'}}>Charts and Maps</p><hr class="solid" /></div>
        </div> 
    </div>
  )
}
