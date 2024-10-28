import React from 'react'
import Navebar from '../ui_comp/Navebar';
import Footer from '../ui_comp/Footer';
import { useLocation } from 'react-router-dom'
import DynamicpgWebpage from './DynamicpgWebpage';

const Dynamicpg = () => {
  let useloca = useLocation();
  let usedata = useloca.pathname.split('/')[2];
  const isLimited = false;

  return (
    <div className=' bg-gray-100' >
     
        <Navebar/>
        <DynamicpgWebpage usedata={usedata} isLimited={isLimited} />
        <Footer/>
    </div>
  )
}

export default Dynamicpg