var categoryModel = require("../../models/category")
var productModel = require("../../models/products")
var validateCategory = require("./validateCategory")
var brandModel = require("../../models/brand")

const addProduct = (params) => {
    return new Promise((resolve, reject) => {
        productModel.find({"name": params.name}, (err, docs) => {
            if(docs.length > 0) {
                reject({
                    "status": false,
                    "msg": "Product already existing"
                })
            } else {
                // validate category
                validateCategory(params.category).then(r => {
                    console.log(r)
                    // add product
                    var d = new productModel({
                        "name": params.name,
                        "description": params.description,
                        "price": params.price,
                        "quantity": params.quantity,
                        "category": params.category,
                        "brand": params.brand,
                        "specifications": params.specifications
                    })
                    brandModel.find({"name_lower": params.brand.toLowerCase()}, (errBrand, brandDocs) => {
                        if(brandDocs.length == 0) {
                            reject({
                                "status": false,
                                "msg": "Brand Doesnot exist"
                            })
                        } else {
                            d.save()
                            resolve({
                                "status": true,
                                "msg": "Product Added"
                            })
                        }
                    })
                }).catch(e => {
                    console.log(e)  
                    reject(e)       
                })
            }
        })
    })
}

// const addProduct = (params) => {
//     return new Promise((resolve, reject) => {
//         productModel.find({}, (err, docs) => {
//             if (docs.length == 0) {
//                 if (params.category.split("/").length > 1) {
//                     if (params.force) {
//                         // check if we need to add categories
//                         categoryModel.find({
//                             name: params.category.split("/")[params.category.split("/").length - 1]
//                         }, (err2, docs2) => {
//                             if (docs2.length == 0) {
//                                 // add category tree
//                                 for (let i = 0; i < params.category.split("/").length; i++) {
//                                     var c = new categoryModel({
//                                         name: params.category.split("/")[i],
//                                         parents: params.category.split("/").slice(0, i),
//                                         children: params.category.split("/").slice(i + 1, params.category.split("/").length)
//                                     })
//                                     c.save()
//                                 }
//                                 // save product
//                                 var p = new productModel({
//                                     name: params.name,
//                                     price: params.price,
//                                     quantity: params.quantity,
//                                     brand: params.brand,
//                                     category: params.category,
//                                     description: params.description,
//                                     img: params.img
//                                 })
//                                 p.save()
//                                 var r = {
//                                     status: true,
//                                     msg: "Entry Added"
//                                 }
//                                 resolve(r)
//                             } else {
//                                 if (docs2.length == 1) {
//                                     docs2.forEach(el => {
//                                         var t = params.category.split("/").slice(0, params.category.split("/").length - 1)
//                                         var fs = true
//                                         if(el.parents.length != t.length) {
//                                             fs = false
//                                         } else {
//                                             for (let ind = 0; ind < t.length; ind++) {
//                                                 if(t[ind] !== el.parents[ind]) {
//                                                     fs = false
//                                                 }
//                                             }
//                                         }
//                                         if (fs) {
//                                             // proceed with adding product
//                                             var p = new productModel({
//                                                 name: params.name,
//                                                 price: params.price,
//                                                 quantity: params.quantity,
//                                                 brand: params.brand,
//                                                 category: params.category,
//                                                 description: params.description,
//                                                 img: params.img
//                                             })
//                                             p.save()
//                                             var r = {
//                                                 status: true,
//                                                 msg: "Product Added"
//                                             }
//                                             resolve(r)
//                                         } else {
//                                             var r = {
//                                                 status: false,
//                                                 msg: "Wrong Category Tree"
//                                             }
//                                             reject(r)
//                                         }
//                                     })
//                                 }
//                             }
//                         })
//                     } else {
//                         // check if category exists and it is a valid category
//                         categoryModel.find({
//                             name: params.category.split("/")[params.category.split("/").length - 1]
//                         }, (err2, docs2) => {
//                             if (docs2.length == 0) {
//                                 var r = {
//                                     status: false,
//                                     msg: "Product Subclass donot exist, request permission to create subclass"
//                                 }
//                                 reject(r)
//                             } else {
//                                 if(docs2.length == 1) {
//                                     docs2.forEach(el => {
//                                         if(el.parents == params.category.split("/").slice(0, params.category.split("/").length - 1)) {
//                                             var c = new categoryModel({
//                                                 name: params.category.split("/")[i],
//                                                 parents: params.category.split("/").slice(0, i),
//                                                 children: params.category.split("/").slice(i + 1, params.category.split("/").length)
//                                             })
//                                             c.save()
//                                             var r = {
//                                                 status: true,
//                                                 msg: "Product Added"
//                                             }
//                                             resolve(r)
//                                         } else {
//                                             var r = {
//                                                 status: false,
//                                                 msg: "No matching Subcategory"
//                                             }
//                                             resolve(r)
//                                         }
//                                     })
//                                 }
//                             }
//                         })
//                     }
//                 }
//             } else {
//                 // if force == true and product exists, update quantity, else check for 
//                 if(params.force) {
//                     productModel.find({name: params.name, category: params.category, brand: params.brand, price: params.price}, (err, existingEntry) => {
//                         if(existingEntry.length == 1){
//                             temp = existingEntry[0]
//                             temp.quantity = temp.quantity + 1
//                             productModel.findByIdAndUpdate(temp._id, temp, {new: true}, (err_u, m) => {
//                                 if(!err_u) {
//                                     var r = {
//                                         status: true,
//                                         msg: "Updated Product quantity"
//                                     }
//                                     resolve(r)
//                                 } else {
//                                     var r = {
//                                         status: false,
//                                         msg: err_u
//                                     }
//                                     reject(r)
//                                 }
//                             })
//                         } else {
//                             // check for valid category name
//                             categoryModel.find({name: params.category.split("/")[params.category.split("/").length - 1]}, (err_v, existingCat) => {
//                                 if(existingCat.length == 0) {
//                                     // add categories
//                                     for (let i = 0; i < params.category.split("/").length; i++) {
//                                         var c = new categoryModel({
//                                             name: params.category.split("/")[i],
//                                             parents: params.category.split("/").slice(0, i),
//                                             children: params.category.split("/").slice(i + 1, params.category.split("/").length)
//                                         })
//                                         c.save()
//                                     }
//                                     // add product
//                                     var p = new productModel({
//                                         name: params.name,
//                                         price: params.price,
//                                         quantity: params.quantity,
//                                         brand: params.brand,
//                                         category: params.category,
//                                         description: params.description,
//                                         img: params.img
//                                     })
//                                     p.save()
//                                     var r = {
//                                         status: true,
//                                         msg: "Added Product"
//                                     }
//                                     resolve(r)
//                                 } else {
//                                     existingCat.forEach(elCat => {
//                                         var t = params.category.split("/").slice(0, params.category.split("/").length - 1)
//                                         var fs = true
//                                         if(elCat.parents.length != t.length) {
//                                             fs = false
//                                         } else {
//                                             for (let ind = 0; ind < t.length; ind++) {
//                                                 if(t[ind] !== elCat.parents[ind]) {
//                                                     fs = false
//                                                 }
//                                             }
//                                         }
//                                         if (fs) {
//                                             // proceed with adding product
//                                             var p = new productModel({
//                                                 name: params.name,
//                                                 price: params.price,
//                                                 quantity: params.quantity,
//                                                 brand: params.brand,
//                                                 category: params.category,
//                                                 description: params.description,
//                                                 img: params.img
//                                             })
//                                             p.save()
//                                             var r = {
//                                                 status: true,
//                                                 msg: "Product Added"
//                                             }
//                                             resolve(r)
//                                         } else {
//                                             var r = {
//                                                 status: false,
//                                                 msg: "Wrong Category Tree"
//                                             }
//                                             reject(r)
//                                         }
//                                     })  
//                                 }
//                             })
//                         }
//                     })
//                 } else {
//                     productModel.find({name: params.name, category: params.category, brand: params.brand, price: params.price}, (err, existingEntry) => {
//                         if(existingEntry.length == 1) {
//                             var r = {
//                                 status: false,
//                                 msg: "Entry already existing"
//                             }
//                             reject(r)
//                         } else {
//                             // check for valid category
//                             categoryModel.find({name: params.category.split("/")[params.category.split("/").length - 1]}, (err_v, existingCat) => {
//                                 if(existingCat.length == 0) {
//                                     var r = {
//                                         status: false,
//                                         msg: "Category Doesnot exist"
//                                     }
//                                     reject(r)
//                                 } else {
//                                     existingCat.forEach(elCat => {
//                                         var t = params.category.split("/").slice(0, params.category.split("/").length - 1)
//                                         var fs = true
//                                         if(elCat.parents.length != t.length) {
//                                             fs = false
//                                         } else {
//                                             for (let ind = 0; ind < t.length; ind++) {
//                                                 if(t[ind] !== elCat.parents[ind]) {
//                                                     fs = false
//                                                 }
//                                             }
//                                         }
//                                         if (fs) {
//                                             // proceed with adding product
//                                             var p = new productModel({
//                                                 name: params.name,
//                                                 price: params.price,
//                                                 quantity: params.quantity,
//                                                 brand: params.brand,
//                                                 category: params.category,
//                                                 description: params.description,
//                                                 img: params.img
//                                             })
//                                             p.save()
//                                             var r = {
//                                                 status: true,
//                                                 msg: "Product Added"
//                                             }
//                                             resolve(r)
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }

//             }
//         })
//     })
// }

module.exports = addProduct