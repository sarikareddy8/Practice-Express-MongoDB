const mongoose=require("mongoose");
require('dotenv').config();
/* we can write in this form
  mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true
    }) 
    const db=mongoose.connection;
    db.once('open',()=>{
    console.log("connection established");
});
*/
const connectDB=async ()=>{
    const connection=await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MONGODB connected at ${connection.connection.port}`);
}

module.exports=connectDB;