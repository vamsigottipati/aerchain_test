import React, { Component } from 'react';
import '../App.css';
import { Input } from "antd"
import { Radio } from 'antd'
import { Checkbox, Row, Col } from "antd"
import { Button } from 'antd';
import { Tree } from 'antd'

const { TreeNode } = Tree
const treeViewGen = require("./treeViewGen")
const { Search } = Input;

  

class Home extends Component {
  state = {
    products: [],
    categories: [],
    filteredProducts: [],
    treeView: [],
    treeData: [],
    filteredTreeView: [],
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
  search (v) {
    if(v.length) {
      var temp = []
      this.state.products.forEach(el => {
        if(el.name.toLowerCase().includes(v.toLowerCase()) || el.description.toLowerCase().includes(v.toLowerCase()) || el.brand.toLowerCase().includes(v.toLowerCase()) || el.category.toLowerCase().includes(v.toLowerCase())) {
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

      this.getSortedCategories()
      document.getElementById("loader").style.display = "none"
      document.getElementById("products").style.display = "flex"
    })
  }

  treeView = []
  curSelection = ""

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


  addToCat (val) {
    var x = val.target.value
    var status = false
    this.state.categories.forEach(el => {
      if(el.name == x && el.parents.length == 0) {
        status = true
      }
    })
    if(status) {
      var productsArr = [x]
      var temp = []
      this.state.categories.forEach(el => {
        if(this.arraysEqual(el.parents, productsArr)) {
          temp.push(el)
        }
      })
      var y = 0
      for (let index = 0; index < this.state.treeView.length; index++) {
        if(this.state.treeView[index].name == x) {
          y = index
        }
      }
      var temp2 = this.state.treeView
      var temp3 = []
      console.log(y)
      if(y == temp2.length) {
        temp3 = temp.concat(temp2)
      } else {
        temp3 = temp2.slice(0, y+1).concat(temp).concat(temp2.slice(y+1, temp2.length+1))
      }
      this.setState({
        filteredTreeView: temp3
      })
    }
    this.curSelection = x
    this.search(x)
  }

  getSortedCategories() {
    fetch('http://localhost:5000/getCategories', {
      method: 'GET'
    }).then(r => r.json()).then(data => {
      // console.log(data)
      this.setState({
        categories: data
      })
      this.state.categories.forEach(el => {
        if(el.parents.length == 0) {
          this.treeView.push(el)
        }
      })
      this.setState({
        treeView: this.treeView
      })
      this.setState({
        filteredTreeView: this.treeView
      })
      var xxx = treeViewGen(data)
      this.setState({
        treeData: xxx
      })
    })
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
    this.mofidyResults(checkedKeys)
    this.setState({ checkedKeys });
  };

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
  }

  mofidyResults (e) {
    var temp = []
    e.forEach(el => {
      this.state.products.forEach(elp => {
        if(elp.category.includes(el) && !this.containsObject(elp, temp)) {
          temp.push(elp)
        }
      })
    })
    this.setState({
      filteredProducts: temp
    })
    console.log(temp)
  }

  onSelect = (selectedKeys, info) => {
    // console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render () {
    return (
      <div className="Home">
        <main style={{display: 'flex', flexDirection: 'row'}}>
            <aside style={{width: '400px', height: '92vh', overflow: 'auto', boxShadow: '0px 0 0px 0px rgba(0, 0, 0, 0)', background: 'rgb(245, 245, 245)', paddingLeft: '50px', position: 'fixed'}}>
              <Search placeholder="Search for an Item" className="searchBar" onSearch={value => this.search(value)} enterButton />
              <p style={{marginTop: '5vh'}} className="heading">Categories</p>
                    <Tree
                      checkable
                      onExpand={this.onExpand}
                      expandedKeys={this.state.expandedKeys}
                      autoExpandParent={this.state.autoExpandParent}
                      onCheck={this.onCheck}
                      checkedKeys={this.state.checkedKeys}
                      onSelect={this.onSelect}
                      selectedKeys={this.state.selectedKeys}
                    >
                      {this.renderTreeNodes(this.state.treeData)}
                    </Tree>
              {/* <Radio.Group style={{ width: '100%' }} onChange={val => this.addToCat(val)}>
              {
                this.state.filteredTreeView.map(el => 
                (
                  <Col key={el.name} style={{marginTop: '15px', marginLeft: el.parents.length*20 + 15 + 'px'}} span={24}>
                    <Radio value={el.name}>{el.name}</Radio>
                  </Col>
                )  
                )
              }
              </Radio.Group> */}
              {/* <p style={{marginTop: '5vh'}} className="heading">Sort</p> */}
            </aside>  
            <aside className="productsCont" style={{width: 'calc(100vw - 400px)', marginLeft: '400px'}}>
              {
                !this.state.filteredProducts.length && <p style={{fontSize: '26px', width: '100%',textAlign: 'center', marginTop: '15vh'}}>Applied Filters gave no results</p>
              }
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











  // reorder(data) {
    // var temp = data
    // var final = []
    // var p = []
    // for (let index = 0; index < temp.length; index++) {
    //   if(temp[index].parents.length == 0) {
    //   final.push({
    //     "name": temp[index].name,
    //     "children": {}
    //   })
    //   p.push(index)
    //   }
    // }
    // p.forEach(el => {
    //   temp.splice(el, 1)
    // })
    // // console.log(final, temp)
    // var counter = 0
    // var x = 3000  
    // while(x > 0) {
    //   var counter2 = 0
    //   // console.log(counter)
    //   var aa = []
    //   temp.forEach(el => {
    //     var n = el.parents[0]
    //     for (let index = 0; index < final.length; index++) {
    //       if(final[index].name == n) {
    //         // console.log(el.parents.length)
    //         if(el.parents.length == counter) {
    //           console.log(counter)
    //           if(counter == 1) {
    //             final[index].children[el.name] = {
    //               "name": el.name,
    //               "children": {}
    //             }
    //           } else {
    //             console.log("camehere")
    //             var s = "final[index]."
    //             for (let index2 = 1; index2 <= counter; index2++) {
    //               s = s + `children.el.parents[${index2}]`
    //             }
    //             s=s+el.name
    //             var asdasd = {
    //                 "name": el.name,
    //                 "children": {}
    //               }
    //             aa.push(counter2)
    //             eval("s=asdasd")
    //           }
    //         }
    //       }
    //     }
    //     counter2 = counter2+1
    //   })
    //   // console.log(aa)
    //   // if(aa.length > 0) {
    //   //   aa.forEach(el => {
    //   //     temp.splice(el, 1)
    //   //   })
    //   // }
    //   counter = counter + 1
    //   x = x-1
    // }

    // console.log(final)

  // }