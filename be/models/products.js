const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/aerchain_test", {
    useNewUrlParser: true
}).then(resp => {console.log("\n connected to db \n \n")}).catch(err => {console.log(err)})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
        default: "https://firebasestorage.googleapis.com/v0/b/myownproject-7c0c9.appspot.com/o/images%2F1.jpg?alt=media&token=9c0d59d9-9dd8-4ee9-976f-9f0567e28c43"
    }
})


const productSchemaRel = mongoose.model("product", productSchema)
module.exports = productSchemaRel

