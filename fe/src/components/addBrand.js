import React, {Component} from 'react';
import '../App.css';
import { Input } from 'antd'
import { Radio } from 'antd'
import { Button } from 'antd';

class addBrand extends Component {

  submitBrand (e) {
    var val = []
    var s = ""
    if(document.getElementById("inputBrand").value) {
      document.getElementById("mainCont").style.display = "none"
      document.getElementById("loader").style.display = "block"
      
      fetch('http://localhost:5000/addBrand', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "name": document.getElementById("inputBrand").value
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
    } else {
      alert("Enter a Brand Name")
    }
  }

  again(e) {
    window.location.reload()
  }

  render () {
    return (
      <div className="addBrand">
        <div id="loader" className="loader"></div>
        <div id="afterMsg">
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px', textAlign: 'center', width: '100vw'}} id="Message">Category Added</p>
          <Button style={{marginTop: '60px'}} onClick={(e) => this.again(e)} size="large" type="primary">Add  another brand</Button>
        </div>
        <div id="mainCont" style={{alignSelf: 'center', width: '40vw'}}>
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Give a Brand Name</p> 
          <Input size="large" placeholder="Name of the Brand" id="inputBrand" style={{margin: '0px'}} />
          <Button style={{marginTop: '60px'}} onClick={(e) => this.submitBrand(e)} size="large" type="primary">Add Category</Button>
        </div>
      </div>
    )
  }
}


export default addBrand;
