import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load all environment variables(env) to backend from .env file

export default function authenticateUser(req, res, next){
    
        const header = req.header("Authorization")
        console.log(header)

        if (header!=null){
          const token = header.replace("Bearer", " ")
          console.log(token)
        
          jwt.verify(token, process.env.JWT_SECRET,
            (error,decoded)=>{
                console.log(decoded)
                
                if(decoded==null){
                    res.json({
                        message:"Invalid Token Please Login Again"
                    }
                  )
                }else{
                    req.user=decoded
                    next()
                } 
              }   
          )
           }else{
            next()
           }
     }


