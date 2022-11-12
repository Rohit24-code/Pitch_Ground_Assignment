const mongoose= require("mongoose")

const TodoSchema= new mongoose.Schema({
    todo:String,
    isCompleted:Boolean
})

const TodoModel= mongoose.model("todo",TodoSchema)
module.exports=TodoModel