import { cacheInstance } from "../services/cache.service.js"


export const connectCache = ()=>{
    try {
        cacheInstance.on("create",()=>{
            console.log("redis connected")
        })
        cacheInstance.on("error",(error)=>{
            console.log("error in redis",error)
        })
    } catch (error) {
        console.log("error in connection Redis",error)
        
    }
}