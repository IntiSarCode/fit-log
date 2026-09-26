import React from 'react';
import Home from './Hero/Banner';
import Books from './Home/Homepage';
import Footer from './components/Footer';



const Navbar = () => {
  return (
    <div>
      <Home/>
      <div id="workouts">
        <Books/>
      </div>
      <page/> 
      <Footer />

  
      
      
   </div>
  );
    

};

export default Navbar;
