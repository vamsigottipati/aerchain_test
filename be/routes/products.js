var express = require('express');
var router = express.Router();

var productModel = require("../models/products")
var addProduct = require("../controllers/products/addProduct")
var categoryModel = require("../models/category")

router.get('/getProducts', (req, res, next) => {
    productModel.find({}, function (err, docs) {
        res.send(docs)
    });
});

router.get('/getCategories', (req, res) => {
    categoryModel.find({}, function (err, docs) {
        res.send(docs)
    });
});

router.post('/addProduct', (req, res) => {
    addProduct(req.body).then(r => {
        res.send(r)
    }).catch(err => {
        res.send(err)
    })
});

router.post('/addCategories', (req, res) => {
    console.log(req.body)
    if(req.body.treeStruct === "" || req.body.treeStruct == null) {
        categoryModel.find({name: req.body.name}, (err, docs) => {
            if(docs.length == 0) {
                var d = new categoryModel({
                    name: req.body.name,
                    parents: [],
                    children:[]
                })
                d.save()
                var r = {
                    status: true,
                    msg: "Category Added"
                }
                console.log(req.body, r)
                res.send(r)
            } else {
                var r = {
                    status: false,
                    msg: "Category Already Exists"
                }
                console.log(req.body, r)
                res.send(r)
            }
        })
    } else {
        categoryModel.find({name: req.body.name}, (err, docs) => {
            if(docs.length == 0) {
                // check for topmost parent
                parents = req.body.treeStruct.split("/")
                status = true
                for (let index = 0; index < parents.length; index++) {
                    categoryModel.find({name: parents[index]}, (err1, docs1) => {
                        if(docs1.length == 0) {
                            status = false
                        } else {
                            if(index+1 < parents.length) {
                                if(!docs1[0].children.includes(parents[index+1])) {
                                    status = false
                                }
                            }
                        }
                    })                
                }
                if(status) {
                    // update immediate parent
                    console.log(parents[parents.length-1])
                    categoryModel.find({name: parents[parents.length-1]}, (err2, docs2) => {
                        console.log(docs2)
                        if(docs2.length == 1) {
                            var temp = docs2[0]
                            temp.children.push(req.body.name)
                            categoryModel.findByIdAndUpdate(docs2[0]._id, temp, {new: true}, (err_u, m)=> {
                                if(err_u) {
                                    var r = {
                                        status: false,
                                        msg: err_u
                                    }
                                    console.log(req.body, r)
                                    res.send(r)
                                } else {
                                    var d = new categoryModel({
                                        name: req.body.name,
                                        parents: parents,
                                        children: []
                                    })
                                    d.save()
                                    var r = {
                                        status: true,
                                        msg: "Added category and updated parent"
                                    }
                                    console.log(req.body, r)
                                    res.send(r)
                                }
                            })
                        } else {
                            var r = {
                                status: false,
                                msg: "Error with database entries"
                            }
                            console.log(req.body, r)
                            res.send(r)
                        }
                    })
                }
    
            } else {
                var r = {
                    status: false,
                    msg: "category already existing"
                }
                console.log(req.body, r)
                res.send(r)
            }
        })
    }
});


module.exports = router;