const express = require("express");
const { connection } = require("./connection/db");
const app = express();
const fs = require("fs");
const move=require("fs-extra");
const TodoModel = require("./Models/todo.model");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.post("/directory/create",async(req, res) => {
  let { path, newfile, data } = req.body;
   
  fs.readdir("directory", (err, files) => {
    if (err) console.log(err);
    else {
      let narr=files.filter((e)=>e===path)
      if(narr.length===0){
        fs.mkdir(`directory/${path}`, { recursive: true }, (error) => {
          if (error) {
            console.log(error);
          } else {
            fs.mkdir(`directory/${path}/Not Done`, (error) => {
              if (error) console.log("inner", error);
              else {
                fs.writeFile(
                  `directory/${path}/Not Done/${newfile}`,
                  data,
                  (err) => {
                    if (err) console.log(err);
                    else {
                      console.log("File written successfully");
                    }
                  }
                );
              }
            });
            fs.mkdir(`directory/${path}/Done`, (error) => {
              if (error) console.log("inner", error);
              else {
                fs.writeFile(
                  `directory/${path}/Done/${newfile}`,
                  data,
                  (err) => {
                    if (err) console.log(err);
                    else {
                      console.log("File written successfully");
                    }
                  }
                );
              }
            });
            res.send("directory create");
          }
        });
      }
      else{
          fs.writeFile(`directory/${path}/Not Done/${newfile}`, data,(err) => {
            if (err) console.log(err);
            else {
              console.log("New File written successfully in else");
            }
          });
          res.send("new file")
      }
    }
  });
});

app.post("/directory/list", (req, res) =>
  fs.readFile("directory", "utf-8", (err, data) => {
    fs.readdir("directory", (err, files) => {
      if (err) console.log(err);
      else {
        res.send(files);
      }
    });
  })
);

app.post("/directory/remove", (req, res) => {
  const { folder } = req.body;
  fs.rm(`directory/${folder}`, { recursive: true }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`${folder} Deleted`);
    }
  });
});



app.listen(PORT, async() => {
  await connection;
  console.log("connected to db");
  console.log(`connected to port http://localhost:${PORT}`);
});
