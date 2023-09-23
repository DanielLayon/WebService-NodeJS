const fs = require("fs");

function changeAvatar(username,image){
    let path = `E:/Sistema/App/Data/Users/${username}/`;

    fs.unlinkSync(`${path}avatar.png`)

    if(!(fs.existsSync(`${path}avatar.png`))){
        fs.writeFile(`${path}avatar.png`,image,"base64",(err)=>{
            if(err){
                return {
                    status:0,
                    error:"FS001",
                    message:err.message
                };
            }else{
                return {
                    status:100,
                    message:"Successful"
                };
            }
        })
    }else{
        return {
            status:0,
            error:"FS002",
            message:"File already exists!"

        };
    }
}