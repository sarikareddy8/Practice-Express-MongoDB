const express=require('express');
const path=require('path');
const members=require('./Members');
const expressLayouts=require('express-ejs-layouts');
const routes=require('./routes/api');



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

app.get("/employees",(req,res)=>{
    res.render("list-employees",{title:"Welcome",members});
});

app.listen(5000,()=>console.log("server running at port 5000"));