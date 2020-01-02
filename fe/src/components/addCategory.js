import React, {Component} from 'react';
import '../App.css';
import { Input } from 'antd'
import { Radio } from 'antd'
import { Button } from 'antd';

class addCategory extends Component {

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
    // console.log(e.target.value)
  }

  submitCategory (e) {
    // console.log(this.state.selectedCat, document.getElementById("inputCategory").value)
    // get parents from category name
    var val = []
    var s = ""
    if(document.getElementById("inputCategory").value) {
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
      fetch('http://localhost:5000/addCategories', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "name": document.getElementById("inputCategory").value,
          "treeStruct": s
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
      alert("Enter a Category Name")
    }
  }

  again(e) {
    window.location.reload()
  }

  render () {
    return (
      <div className="addCategory">
        <div id="loader" className="loader"></div>
        <div id="afterMsg">
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px', textAlign: 'center', width: '100vw'}} id="Message">Category Added</p>
          <Button style={{marginTop: '60px'}} onClick={(e) => this.again(e)} size="large" type="primary">Add  another category</Button>
        </div>
        <div id="mainCont" style={{alignSelf: 'center', width: '40vw'}}>
          <p style={{margin: '0px', padding: '0px', paddingBottom: '20px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Choose Category Name</p> 
          <Input size="large" placeholder="Name of Category" id="inputCategory" style={{margin: '0px'}} />
          <p  style={{margin: '0px', padding: '0px', paddingBottom: '0px', paddingTop: '50px', fontFamily: 'Brandon Grotesque Medium', fontSize: '20px'}}>Select a Parent Category</p>
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
          <Button style={{marginTop: '60px'}} onClick={(e) => this.submitCategory(e)} size="large" type="primary">Add Category</Button>
        </div>
      </div>
    )
  }
}


export default addCategory;
