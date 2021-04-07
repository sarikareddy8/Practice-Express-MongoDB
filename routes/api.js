const express=require('express');
const members=require('../Members');
const router=express.Router();

//get employees
router.get('/',(req,res)=>{
    res.json(members);
});

//get employee by id
router.get('/:id',(req,res)=>{
    const found=members.some(member=>member.id==parseInt(req.params.id));
    if(found){
        res.status(200).json(members.filter(member=>member.id==parseInt(req.params.id)));
    }
    else{
        res.status(400).json({message:`${req.params.id} not found`});
    }
});

//create employee
router.post('/',(req,res)=>{
    if(!req.body.id || !req.body.name || !req.body.email || !req.body.status){
        res.status(400).json({message:"please provide all details"})
    }
    else{
        members.push(req.body);
        res.json(members);
    }
});

//update an employee
router.put('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id))
            {
            member.name = req.body.name ? req.body.name : member.name;
            member.email = req.body.email ? req.body.email : member.email;
            member.id = req.body.id ? req.body.id : member.id;
            member.status = req.body.status ? req.body.status : member.status;
            }
        });
        res.json({members})
    }
    else{
        res.status(400).json({message:`${req.params.id} not found`});
    }
});

//delete employee
router.delete('/:id',(req,res)=>{
    const found=members.some(member=>member.id==parseInt(req.params.id));
    if(found){
        
       res.json({members: members.filter(member=>member.id!==parseInt(req.params.id))});

    }
    else{
        res.status(400).json({message:`${req.params.id} not found`});
    }
});

module.exports=router;