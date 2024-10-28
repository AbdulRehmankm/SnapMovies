import './index.css';
import React from 'react';
import Navebar from './ui_comp/Navebar';
import Hero1 from './ui_comp/Hero1';
import Hero2 from './ui_comp/Hero2';
import Herofree from './ui_comp/Herofree';
import Footer from './ui_comp/Footer';

function App() {
  return (
    <div>
      <Navebar />
      <Hero1 />
      <Hero2 />
      <Herofree />
      <Footer />
    </div>
  );
}

export default App;
