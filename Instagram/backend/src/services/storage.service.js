const Imagekit = require('image-kit')

 const storageInstance = new Imagekit({
    endpoint:process.env.IK_ENDPOINT_URL,
    publicKey:process.env.IK_PUBLIC_KEY,
    privateKey:process.env.IK_PRIVATE_KEY
 })

 const sendImagetoIK = (file,fileName)=>{
return storageInstance.upload({
    file,
    fileName,
    folder:'instagram'
})    
 }

 module.exports = sendImagetoIK