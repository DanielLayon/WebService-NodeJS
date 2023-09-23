const fs = require("fs");

function addImage(username,image,imageName){
    let path = `E:/Sistema/App/Data/Users/${username}/img/`;

    if(!(fs.existsSync(`${path+imageName}`))){
        fs.writeFile(`${path+imageName}`,image,"base64",(err)=>{
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