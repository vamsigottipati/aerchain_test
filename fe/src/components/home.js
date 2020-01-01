import React from 'react';
import '../App.css';


const Home = () => (
  <div className="Home">
    <main className="shoppingMain">
        <aside style={{width: '35vw', height: '92vh', overflow: 'auto', boxShadow: '0px 0 0px 0px rgba(0, 0, 0, 0)', background: 'rgb(245, 245, 245)', paddingLeft: '5vw'}}>
        <p style={{marginTop: '5vh'}} className="heading">Filters</p>
        <p style={{marginTop: '5vh'}} className="heading">Sort</p>
        </aside>
        <aside style={{width: '65vw'}}></aside>
    </main>
  </div>
);

export default Home;
