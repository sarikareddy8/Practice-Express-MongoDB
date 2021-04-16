const express=require('express');
const members=require('../Members');
const router=express.Router();
const connectDB=require('../config/database');
const Employee=require("../models/employees");

connectDB();

//get employees
router.get('/',async (req,res)=>{
    await Employee.find({},(err,data)=>{
        if(err){
            return err;
        }
       // res.json({members:data})
       res.redirect("/employees");
    })
});

//get employee by id
router.get('/:name',async (req,res)=>{
    try{
        await Employee.findOne({name:req.params.name},(err,data)=>{
            if(err){
                return res.send(err);
            }
            if(data==null)
            {
                res.status(400).json({message:`${req.params.name} not found`});
            }
            else{
                res.status(200).json({employee:data});
            }
            
        });
    }
    catch(err){
       console.log(err);
    }
});

//create employee
router.post('/',(req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.status){
        res.status(400).json({message:"please provide all details"})
    }
    else{
        const employee=new Employee({...req.body})
         employee.save()
         .then((data)=>{
                res.redirect('/employees');
         })
         .catch((err)=>{
             res.send(err);
         });
        
    }
});

//update an employee
router.put('/:name', (req,res)=>{
    
        Employee.updateOne({name:req.params.name},req.body)
        .then(data=>{
            res.json({data});
        })
        .catch(err=>{
            res.status(400).json({err});
        });  
});



//delete employee
router.delete('/:name',(req,res)=>{
    
       Employee.findOneAndRemove({name:req.params.name})
       .then(()=>{
             res.json({message:"account deleted"})
        })
        .catch(err=>res.json({error:"not found"}))
        
   
});

module.exports=router;