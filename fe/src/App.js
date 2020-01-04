import React from 'react';
// import { Button } from 'antd';
import './App.css';
import Nav from "./components/nav"
import Home from "./components/home"
import addCategory from "./components/addCategory"
import addProduct from "./components/addProduct"
import addBrand from "./components/addBrand"


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => (
  // get list of all products and show them here

  <Router >
    <div className="App">
      <Nav />
      <Switch> 
        <Route path='/' exact component={Home}/>
        <Route path='/addProduct' exact component={addProduct}/>
        <Route path='/addCategory' exact component={addCategory}/>
        <Route path='/addBrand' exact component={addBrand}/>
      </Switch> 
    </div>
  </Router>

);

export default App;
