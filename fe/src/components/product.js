import React, { Component } from 'react';
import { Button } from 'antd';

const prod = (props) => {
        return (
            <div className="productCard">
                <img src="https://firebasestorage.googleapis.com/v0/b/myownproject-7c0c9.appspot.com/o/images%2F1.jpg?alt=media&token=9c0d59d9-9dd8-4ee9-976f-9f0567e28c43" style={{width: "300px", height: "230px"}} alt=""/>
                
                <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '20px', margin: '0px'}}>{props.name}</p>
                <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '8px', margin: '0px',}}>{props.description}</p>
                <p style={{paddingLeft: '20px',paddingRight: '20px', paddingTop: '8px', margin: '0px'}}>₹ {props.price}</p>
        
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button size="small" style={{margin: '20px'}} type="primary">Add Category</Button>
                    <Button size="small" style={{margin: '20px', marginLeft: '0px'}} type="link">Know More</Button>
                </div>
            </div>
        )
}

export default prod