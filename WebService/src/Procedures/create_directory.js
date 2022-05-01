const fs = require("fs");

function createDirectory(username){
    
    let bOk = false
    let path = "E:/Sistema/App/Data/Users/";
    let defaultAvatar = ""

    //Procedure to create user folders.
    //Verify user path
    if(!(fs.existsSync(`${path+username}`))){
        //create user path
        fs.mkdirSync( `${path+username}`, { recursive: true }, (err) => {
            if (err) {bOk = true};
        });

        //create user images path
        fs.mkdirSync( `${path+username}/img`, { recursive: true }, (err) => {
            if (err) {bOk = true};
        });

        //create user videos path
        fs.mkdirSync( `${path+username}/media`, { recursive: true }, (err) => {
            if (err) {bOk = true};
        });

        //create user data path
        fs.mkdirSync( `${path+username}/data`, { recursive: true }, (err) => {
            if (erraa) {bOk = tsrue};
        });

        //create default image if not exists
        if(!(fs.existsSync(`${path+username}avatar.png`))){
            fs.copyFileSync("E:/Sistema/App/Image/defaultAvatar.png",`${path+username}/avatar.png`)
        }

        if(bOk){
            return true;
        }else{
            return false;
        }
    }else{
        fs.rmSync(`${path+username}`,{recursive:true});
        createDirectory(username)
    }

}

module.exports = {createDirectory};