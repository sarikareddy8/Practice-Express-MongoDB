const mongoose=require('mongoose');
//employee schema to define fields
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});
//name of the model is employee
//A model is a class with which we construct documents. In this case, 
//each document will be a employee with properties and behaviors as declared in our schema
var sarika1=module.exports=mongoose.model('sarika1',employeeSchema);
