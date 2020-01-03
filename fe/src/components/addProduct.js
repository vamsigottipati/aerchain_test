import React, {Component} from 'react';
import '../App.css';
import { Input } from 'antd'
import { Radio } from 'antd'
import { Button } from 'antd';

class addProduct extends Component {

  state = {
    x: [],
    selectedCat: ""
  }

  componentDidMount() {
    // get all categories
    fetch('http://localhost:5000/getCategories', {
      method: 'GET'
    }).then(r => r.json()).then(data => {
      // console.log(data)
      this.setState({
        x: data,
      })
    })
  }

  changeCat (e) {
    this.setState(
      {
        selectedCat: e.target.value
      }
    )
  }

  submitProduct (e) {
    // console.log(this.state.selectedCat, document.getElementById("inputCategory").value)
    // get parents from category name
    var val = []
    var s = ""
    // document.getElementById("productName").value && document.getElementById("productDescription").value && document.getElementById("productPrice").value && document.getElementById("productBrand").valuev&& document.getElementById("productQuantity").value
    if(document.getElementById("productName").value) {
      document.getElementById("mainCont").style.display = "none"
      document.getElementById("loader").style.display = "block"
      
      this.state.x.forEach(el => {
        if(el.name === this.state.selectedCat) {
          val = el.parents
          val.push(el.name)
        }
      })
      for (let index = 0; index < val.length; index++) {
        if(index === val.length-1) {
          s = s + val[index]
        } else {
          s = s + val[index] + '/'
        }
      }
      if(s === "") {
        alert("Select a Category")
      } else {
        fetch('http://localhost:5000/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            "name": document.getElementById("productName").value,
            "category": s,
            "brand": document.getElementById("productBrand").value,
            "price": document.getElementById("productPrice").value,
            "force": false,
            "quantity": document.getElementById("productQuantity").value,
            "discription": document.getElementById("productDescription").value,
            "img": "No img",
          })
        }).then(r => r.json()).then(resp => {
          console.log(resp)
          if(resp.status == true) {
            document.getElementById("mainCont").style.display = "none"
            document.getElementById("loader").style.display = "none"
            document.getElementById("afterMsg").style.display = "flex"
          } else {
            alert(resp.msg)
            document.getElementById("mainCont").style.display = "block"
            document.getElementById("loader").style.display = "none"
          }
        })
      }
    } else {
      alert("Enter all the details")
    }
  }

  again(e) {
    window.location.reload()
  }

  render () {
    return (
      <div className="addProduct">
        <div id="loader" className="loader"></div>
        <div id="afterMsg">
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px', textAlign: 'center', width: '100vw'}} id="Message">Product Added</p>
          <Button style={{marginTop: '60px'}} onClick={(e) => this.again(e)} size="large" type="primary">Add  another product</Button>
        </div>
        <div id="mainCont" style={{alignSelf: 'center', width: '40vw'}}>
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Choose a Name for your Product</p> 
          <Input size="large" placeholder="Name of your product" id="productName" style={{margin: '0px'}} />

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Give a description</p> 
          <Input size="large" placeholder="Description" id="productDescription" style={{margin: '0px'}} />

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Set a Price</p> 
          <Input size="large" min="0" type="number" placeholder="Price of the product" id="productPrice" addonAfter={<i class="fas fa-rupee-sign"></i>} style={{margin: '0px'}} />

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Give a Brand</p> 
          <Input size="large" placeholder="Brand" id="productBrand" style={{margin: '0px'}} />

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>How many do you want to add</p> 
          <Input size="large" placeholder="Quantity" min="0" type="number" id="productQuantity" style={{margin: '0px'}} />
          

          <p  style={{margin: '0px', padding: '0px', paddingBottom: '0px', paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Select a Category</p>
          <div style={{width: '40vw', height: 'auto', borderRadius: '5px', display:'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '20px'}}> 
            <Radio.Group name="rootCategory" id="buttonGroup" defaultValue="None" onChange={(e) => this.changeCat(e)} buttonStyle="solid">
              <Radio.Button value="None" style={{margin: '5px', flex: '1'}} >None</Radio.Button>
              {
                this.state.x.map(el => 
                  (<Radio.Button value={el.name} style={{margin: '5px', flex: '1'}} >{el.name}</Radio.Button> )
                )
              }
            </Radio.Group>
          </div>
          <Button style={{marginTop: '60px'}} onClick={(e) => this.submitProduct(e)} size="large" type="primary">Add Product</Button>
        </div>
      </div>
    )
  }
}


export default addProduct;
