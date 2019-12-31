var productModel = require("../../models/products")

const addProduct = (params) => {
    return new Promise((resolve, reject) => {
        productModel.find({}, (err, docs) => {
            if(docs.length == 0) {
                if(params.category.split("/").length > 1) {
                    if(params.force) {
                        //  add subclass and entry
                        var r = {
                            status: true,
                            msg: "No entries; adding"
                        }
                        resolve(r)
                    } else {
                        var r = {
                            status: false,
                            msg: "Product Subclass donot exist, request permission to create subclass"
                        }
                        reject(r)
                    }
                }
                resolve(r)
            } else {
                var r = {
                    status: false,
                    msg: "yet to handle addition"
                }
                resolve(r)
            }
        })
    })
}

module.exports = addProduct



