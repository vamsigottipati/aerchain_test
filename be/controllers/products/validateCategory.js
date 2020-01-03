var categoryModel = require("../../models/category")

const validateCategory = (params) => {
    return new Promise((resolve, reject) => {
        var parentsArr = params.split("/")
        var imParent = parentsArr[parentsArr.length - 1]
        parentsArr = parentsArr.slice(0, parentsArr.length - 1)

        categoryModel.find({"name": imParent}, (err, docs) => {
            if(docs.length == 0) {
                reject({
                    "status": false,
                    "msg": "Error with category"
                })
            } else {
                if(docs.length > 1) {
                    reject({
                        "status": false,
                        "msg": "Error with multiple category"
                    })
                } else {
                    if(docs.length == 1) {
                        var s = true
                        for (let index = 0; index < docs[0].parents.length; index++) {
                            if(docs[0].parents[index] != parentsArr[index]) {
                                s = false
                            }
                        }
                        if(s) {
                            resolve({
                                "status": true,
                                "msg": "Valid category"
                            })
                        } else {
                            reject({
                                "status": false,
                                "msg": "Invalid categories"
                            })
                        }
                    }
                }
            }
        })

    })
}

module.exports = validateCategory
