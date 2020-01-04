const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/aerchain_test", {
    useNewUrlParser: true
}).then(resp => {console.log("\n connected to db \n \n")}).catch(err => {console.log(err)})


const brand = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    name_lower: {
        type: String,
        required: true
    }
})


const brandSchema = mongoose.model("brand", brand)
module.exports = brandSchema

