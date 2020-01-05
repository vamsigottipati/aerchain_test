import React, {Component} from 'react';
import '../App.css';
import { Input, Radio, Button, Select, Icon } from 'antd'

class addProduct extends Component {

  state = {
    categories: [],
    selectedCat: "",
    brands: [],
    selectedBrand: "",
    key: "",
    val: "",
    specifications: {
      // "name": "vamsi",
      // "age": "22"
    }
  }

  componentDidMount() {
    // get all categories
    fetch('http://localhost:5000/getCategories', {
      method: 'GET'
    }).then(r => r.json()).then(data => {
      // console.log(data)
      this.setState({
        categories: data,
      })
    })
    fetch('http://localhost:5000/getBrands', {
      method: 'GET'
    }).then(r2 => r2.json()).then(data2 => {
      console.log(data2)
      this.setState({
        brands: data2
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
      
      this.state.categories.forEach(el => {
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
        document.getElementById("mainCont").style.display = "block"
        document.getElementById("loader").style.display = "none"
      } else {
        console.log("came here")
        fetch('http://localhost:5000/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            "name": document.getElementById("productName").value,
            "category": s,
            "brand": this.state.selectedBrand,
            "price": document.getElementById("productPrice").value,
            "force": false,
            "quantity": document.getElementById("productQuantity").value,
            "description": document.getElementById("productDescription").value,
            "specifications": this.state.specifications,
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

  removeSpecification (e) {
    var temp = this.state.specifications
    delete temp[e]
    this.setState({specifications: temp})
  }

  addSpecification () {
    var key = document.getElementById("specKey").value
    var val = document.getElementById("specVal").value
    if(key) {
      if(val) {
        if (!Object.keys(this.state.specifications).includes(key)) {
          var temp = this.state.specifications
          temp[key] = val
          this.setState({specifications: temp})
          this.setState({
            key: "",
            val: ""
          })
        }
      } else {
        alert("Add a specification value")
      }
    } else {
      alert("Add a specification key")
    }
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
          <Input size="large" min="0" type="number" placeholder="Price of the product" id="productPrice" addonAfter={<i className="fas fa-rupee-sign"></i>} style={{margin: '0px'}} />

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Give a Brand</p> 
          <Select placeholder="Select a brand" size="large" id="productBrand" onChange={val => this.setState({selectedBrand: val})} style={{width: '20vw'}}>{this.state.brands.map(item => (<Select.Option key={item.name} >{item.name}</Select.Option>))}</Select>
          {/* <Input size="large" placeholder="Brand" id="productBrand" style={{margin: '0px'}} /> */}

          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>How many do you want to add</p> 
          <Input size="large" placeholder="Quantity" min="0" type="number" id="productQuantity" style={{margin: '0px'}} />
          
          <p id="specificationsHead" style={{margin: '0px', padding: '0px', paddingBottom: '20px',paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Give specifications</p> 
          {
            Object.keys(this.state.specifications).map(el => (
              <p key={el} style={{fontSize: '17px', margin: '0px', padding: '0px'}} ><Icon type="close-circle" onClick={() => this.removeSpecification(el)} style={{marginRight: '20px', cursor: 'pointer', fontSize: '12px'}}/> {el}: <strong style={{marginLeft: '20px'}}>{this.state.specifications[el]}</strong> </p>
            ))
          }
          <div style={{width: 'auto', background: '#fcfbfb', height: 'auto', border: '1px solid #eee', borderRadius: '5px', display: 'flex', flexDirection: 'column', marginTop: '30px'}}>
            <div style={{display: 'flex', flexDirection: 'row', background: '#eee'}}>
              <p style={{flex: '4', padding: '20px', alignSelf: 'center', margin: '0px',paddingLeft: '25px'}}>Name</p>
              <p style={{flex: '4', padding: '20px', alignSelf: 'center', margin: '0px'}}>Value</p>
              <div style={{flex: '1'}}></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}> 
              <Input placeholder="Key" id="specKey" onChange={(val) => this.setState({key: val.target.value})} value={this.state.key} style={{margin: "0px 20px 10px 20px", flex: '4'}} />
              <Input placeholder="Value" id="specVal" onChange={(val) => this.setState({val: val.target.value})} value={this.state.val} style={{margin: "0px 20px 10px 20px", flex: '4'}}/>
              <div style={{flex: '1'}}></div>
            </div>
            <Button style={{marginLeft: '20px', marginRight: 'auto', marginBottom: '20px'}} onClick={() => this.addSpecification()}> Add </Button>
          </div>

          <p  style={{margin: '0px', padding: '0px', paddingBottom: '0px', paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Select a Category</p>
          <div style={{width: '40vw', height: 'auto', borderRadius: '5px', display:'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '20px'}}> 
            <Radio.Group name="rootCategory" id="buttonGroup" defaultValue="None" onChange={(e) => this.changeCat(e)} buttonStyle="solid">
              <Radio.Button value="None" style={{margin: '5px', flex: '1'}} >None</Radio.Button>
              {
                this.state.categories.map(el => 
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
