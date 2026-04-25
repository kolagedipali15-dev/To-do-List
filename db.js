const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/todo")
.then(()=>{
    console.log("Mongo DB connected");
})
.catch(()=>{
    console.log("Failed to connect");
})

const todos=mongoose.Schema({
    task:{
     type:String,
     required:true
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
       type:String,
       required:true,
    },
    completed:{
        type:String,
        required:true,
    }
})


const collection=new mongoose.model("todotab",todos);

module.exports=collection;