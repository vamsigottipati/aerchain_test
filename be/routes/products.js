var express = require('express');
var router = express.Router();

var productModel = require("../models/products")
var addProduct = require("../controllers/products/addProduct")

router.get('/', (req, res, next) => {
    // get all products
    productModel.find({}, function (err, docs) {
        console.log(docs)
        res.json(docs)
    });
});

router.post('/addProduct', (req, res) => {
    // check if product exists
    // add if not present or else ask to increase quantity
    addProduct(req.body).then(r => {
        res.send(r)
    })
});

router.post('/addCategories', (req, res) => {
    // check if product exists
    console.log(req)
    res.send("requested to add a product")
});


module.exports = router;