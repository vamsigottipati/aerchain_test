import React, { Component } from 'react';
import '../App.css';
import { Input } from "antd"
import { Button } from 'antd';
const { Search } = Input;
  

class Home extends Component {
  state = {
    products: [],
    filteredProducts: []
  }
  search (v) {
    if(v.length) {
      var temp = []
      this.state.products.forEach(el => {
        if(el.name.includes(v) || el.description.includes(v) || el.category.includes(v)) {
          temp.push(el)
        }
      })
      this.setState({
        filteredProducts: temp
      })
      console.log(this.state.filteredProducts)
    } else {
      var temp = this.state.products
      this.setState({
        filteredProducts: temp
      })
    }
  }
  componentDidMount() {
    document.getElementById("loader").style.display = "block"
    fetch('http://localhost:5000/getProducts', {
      method: 'GET'
    }).then(r => r.json()).then(data => {
      // console.log(data)
      this.setState({
        products: data
      })
      this.setState({
        filteredProducts: this.state.products
      })
      document.getElementById("loader").style.display = "none"
      document.getElementById("products").style.display = "flex"
    })
  }
  render () {
    return (
      <div className="Home">
        <main style={{display: 'flex', flexDirection: 'row'}}>
            <aside style={{width: '400px', height: '92vh', overflow: 'auto', boxShadow: '0px 0 0px 0px rgba(0, 0, 0, 0)', background: 'rgb(245, 245, 245)', paddingLeft: '50px', position: 'fixed'}}>
              <Search placeholder="Search for an Item" className="searchBar" onSearch={value => this.search(value)} enterButton />
              <p style={{marginTop: '5vh'}} className="heading">Filters</p>
              <p style={{marginTop: '5vh'}} className="heading">Sort</p>
            </aside>
            <aside className="productsCont" style={{width: 'calc(100vw - 400px)', marginLeft: '400px'}}>
              <div style={{marginTop: 'calc(50vh - 100px)', alignSelf: 'center'}} id="loader" className="loader"></div>
              <div id="products" className="products">
                {
                  this.state.filteredProducts.map(el => 
                    (
                    <div key={el.name} className="productCard">
                      <img src="https://firebasestorage.googleapis.com/v0/b/myownproject-7c0c9.appspot.com/o/images%2F1.jpg?alt=media&token=9c0d59d9-9dd8-4ee9-976f-9f0567e28c43" style={{width: "300px", height: "230px"}} alt=""/>
                      <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '20px', margin: '0px'}}>{el.name}</p>
                      <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '8px', margin: '0px',}}>{el.description}</p>
                      <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '8px', margin: '0px'}}>₹ {el.price}</p>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                          <Button size="small" style={{margin: '20px'}} type="primary">Add to Cart</Button>
                          <Button size="small" style={{margin: '20px', marginLeft: '0px'}} type="link">Know More</Button>
                      </div>
                    </div>
                    )
                  )
                }
              </div>
            </aside>
        </main>
      </div>
    )
  }
}

export default Home;
