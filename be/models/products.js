const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/aerchain_test", {
    useNewUrlParser: true
}).then(resp => {console.log("\n connected to db \n \n")}).catch(err => {console.log(err)})


const productSchema = new mongoose.Schema({
    value: {
        type: Map,
        required: true
    }
})


const productSchemaRel = mongoose.model("product", productSchema)
module.exports = productSchemaRel

