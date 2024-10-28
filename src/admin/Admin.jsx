import React from 'react';
import ItemManagement from './ItemManagement';
import CategoryManagement from './CategoryManagement';
import Navebar from '../ui_comp/Navebar';
import Footer from '../ui_comp/Footer';


const Admin = () => {

  return (
    <div>
      <Navebar />
       <div className=' mt-28'>
         <ItemManagement />
       </div>
       <div className=' mt-28 mb-28'>
        <CategoryManagement />
       </div>
      <Footer />
    </div>
  );

};

export default Admin;
