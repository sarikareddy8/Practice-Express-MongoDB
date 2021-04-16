const express=require('express');
const path=require('path');
//commented as members fetched from db
//const members=require('./Members');
const expressLayouts=require('express-ejs-layouts');
const routes=require('./routes/api');
const connectDB=require('./config/database');

const employee=require("./models/employees");

//connection
connectDB();

//init express
const app=express();

//body parsers
//if extended is false then values will be sent in arrays and strings
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//ejs middleware
app.use(expressLayouts);
app.set('view engine','ejs');

//static folder
//note:while calling pages in public use extention also
app.use(express.static(path.join(__dirname,'public')));

//Routes API
app.use('/api/members',routes);

app.get("/",(req,res)=>{
    res.render("welcome");
});

app.get("/employees",async (req,res)=>{
    await employee.find({},(err,data)=>{
        if(err){
            return err;
        }
       // res.json({members:data})
       res.render("list-employees",{title:"Welcome",members:data});
    })
    
   // res.render("list-employees",{title:"Welcome",members});
});

app.listen(5000,()=>console.log("server running at port 5000"));