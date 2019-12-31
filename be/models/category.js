const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/aerchain_test", {
    useNewUrlParser: true
}).then(resp => {console.log("\n connected to db \n \n")}).catch(err => {console.log(err)})


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parents: {
        type: [String],
        required: true,
    },
    children: {
        type: [String],
        required: true
    }
})


const categorySchemaRel = mongoose.model("category", categorySchema)
module.exports = categorySchemaRel

