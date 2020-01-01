import React from 'react';
// import { Button } from 'antd';
import { Tooltip } from 'antd'
import './App.css';

// get catgories from api

// get products from api

const App = () => (
  // get list of all products and show them here

  <div className="App">

    {/* Navbar */}

    <div className="navbar" style={{zIndex: '999'}}>
      <p className="logo">BrandName</p>
      <p style={{marginRight: '7vw', cursor: 'pointer', fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)'}} className="navbarItems">Add Products</p>
      <p style={{marginRight: '10vw', cursor: 'pointer', fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)'}} className="navbarItems">Add Categories</p>
    </div>

    {/* main section */}

    <main className="shoppingMain" style={{zIndex: '9'}}>
    
      {/* sidebar --> categories */}

      <aside style={{width: '35vw', height: '92vh', overflow: 'auto', boxShadow: '0px 0 0px 0px rgba(0, 0, 0, 0)', background: 'rgb(245, 245, 245)', paddingLeft: '5vw'}}>
        <p style={{marginTop: '5vh'}} className="heading">Filters</p>
        <p style={{marginTop: '5vh'}} className="heading">Sort</p>
      </aside>

      {/* products section */}

      <aside style={{width: '65vw'}}></aside>

    </main>

  </div>
);

export default App;
