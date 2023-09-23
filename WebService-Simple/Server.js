const createDirectory = require("./src/Procedures/create_directory")

const fs = require("fs");
const express = require("express");
const md5 = require('md5')
const fileupload = require("express-fileupload");
const app = express();

app.use(fileupload())
app.use(express.json())
app.use(express.urlencoded())

//i'm using a json just for studies purpose
//the best way to store data aways ll be Databases like mysql, Mongo, db2, and others

app.post("/LOGIN", (req,res)=>{
    let users = JSON.parse(fs.readFileSync("E:/WebService/json/login/users.json"))
    let bOk    = false;
    let path = "E:/Sistema/App/Data/Users/";
    let sToken = req.body.token;
    let sUser  = req.body.user;
    let sPass  = req.body.pass
    
    "E:/Sistema/App/Users"
    if (sToken == "ed1d04cacf70263e310198d494a85316"){
        for(let i = 0;i < users.length;i++){
            if(users[i].username == sUser && users[i].pass == sPass){

                let avatar = fs.readFileSync(`${path}${users[i].username}/avatar.png`,(err)=>{
                    if(err){
                        return {
                            status:0,
                            error:"FS001",
                            message:"ReadFile Error"
                        };
                    }
                });

                res.json({
                    status:100,
                    name:users[i].name,
                    info:users[i].info,
                    avatar: avatar.toString("base64")
                }) 
                bOk = true
                break
            }
        }

        if(!bOk){
            res.json({
                status:0,
                error:"ERR002",
                message:"Authentication error, username or password not found"
            }) 
        }
    }else{
        res.json({
            status:0,
            error:"ERR001",
            message:"Authentication error, contact support to get a new token."
        })
    }

    res.end();
})

app.post("/REGISTER", (req,res)=>{
    let users = JSON.parse(fs.readFileSync("E:/WebService/json/login/users.json"));
    let sName  = req.body.name
    let sToken = req.body.token;
    let sUser  = req.body.username;
    let sPass  = md5(req.body.pass)
    let sEmail = req.body.email; 

    for(user of users){

        if(user.username == sUser){
            res.json({
                status:0,
                error:"USR001",
                message:"User already exists"
            });
            return;
        }

        if(user.email == sEmail){
            res.json({
                status:0,
                error:"USR002",
                message:"Email already in use"
            });
            return;
        }
    }

    if (sToken == "ed1d04cacf70263e310198d494a85316"){
        let bOk = createDirectory.createDirectory(sUser);
        let date =  new Date();

        if(!bOk){
            users.push(
                {
                id:(users.length+1),
                username:sUser,
                pass:sPass,
                email:sEmail,
                name:sName,
                info:"",
                bio:"",
                path:(`E:/Sistema/App/Data/Users/${sUser}`),
                dt_created:`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                }
            )
            console.log(users)
            
            fs.writeFileSync("E:/WebService/json/login/users.json",JSON.stringify(users),"utf-8");
    
            res.json({
                status:100,
                message:"User Created"
            })
        }else{
            res.json({
                status:0,
                error:"USR003",
                message:"User not created, contact support"
            });
            return;
        }
        
    }else{
        res.json({
            status:0,
            error:"ERR001",
            message:"Authentication error, contact support to get a new token."
        })
    }

    res.end();
})

app.post("/CARROS",(req,res)=>{
    
})

app.listen(8085, ()=>{
    console.log("Running http://localhost:8085")
});


