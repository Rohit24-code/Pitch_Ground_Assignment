const express= require("express")
const {connection } = require("./connection/db")
const app= express()
const fs= require("fs")
require("dotenv").config()
const PORT= process.env.PORT || 8080
app.use(express.json())

app.get("/",async(req,res)=>{
   res.send("Hello")
})

 app.post("/directory/create",(req,res)=>{
    let {path,newfile,data}= req.body
    fs.mkdir(`directory/${path}`, { recursive: true }, (error) => {
      if (error) {
        console.log(error);
      } else {
        fs.writeFile(`directory/${path}/${newfile}`, data, (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
          }
        });
        res.send("directory create");
      }
    });
}
 );

 app.post("/directory/list",(req,res)=>fs.readFile("directory","utf-8",(err,data)=>{
     fs.readdir("directory", (err, files) => {
       if (err) console.log(err);
       else {
           res.send(files);
       }
     });
 }));


 app.post("/directory/remove", (req, res) =>{
   const {folder}=req.body
   fs.rm(`directory/${folder}`, {recursive:true},(err) => {
    if(err){
        res.send(err);
    }
    else{
         res.send(`${folder} Deleted`);
    }

   })
 })
 

app.listen(PORT,()=>{
    connection
    console.log("connected to db")
    console.log(`connected to port http://localhost:${PORT}`);
})