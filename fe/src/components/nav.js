import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'


const Nav = () => (
  <div className="Nav">
    <div className="navbar" style={{zIndex: '999'}}>
      <Link to="/" className="logo">
       BrandName
      </Link>
      <Link to="/" style={{marginRight: '8vw', cursor: 'pointer', fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)'}} className="navbarItems">
        Home
      </Link>
      <Link to="/addProduct" style={{marginRight: '8vw', cursor: 'pointer', fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)'}} className="navbarItems">
        Add Products
      </Link>
      <Link to="/addCategory" style={{marginRight: '10vw', cursor: 'pointer', fontSize: '16px', color: 'rgba(0, 0, 0, 0.65)'}} className="navbarItems">
        Add Categories
      </Link>
    </div>
  </div>
);

export default Nav;
