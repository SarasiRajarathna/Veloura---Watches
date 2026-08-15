import { response } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req,res){
try{
    
    const passwordHash = await bcrypt.hashSync(req.body.password, 10); //Hashiing the password with bcrypt

    const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: passwordHash
    })
   
    await newUser.save()
    res.json({
        message: "User created successfully"
    })

}catch(error){
    res.json({
        message: "Error creating user"
    })
}
}

export async function loginUser(req,res){
    try{
        const user = await user.findOne({
            email : req.body.email
        })
        console.log(user)
        if(user == null){
            res.status(404).json({
                message: "User Not Found"
            })

        }else
            const isPasswordValid = await bcrypt.compareSync(req.body.password, user.password); //Comparing the password with the hashing password stored in the database.
            if(isPasswordValid){  // If the password is valid, then we can send a response to the client that the logic is successful. Untill this step the authentication part is done. After this step we can generate a token for the user and send it to the client. 
            //res.json({
                //message: "Login Successfull"
            //})

            if(isPasswordValid){
                const payLoad = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.IsBlocked,
                    isEmailVerified: user.IsEmailVerified,
                    image: user.image
                }
                const token = jwt.sign(payload, "secretKey",{
                    expiresIn : "48h"
                })
                res.json({
                    token: token,
                })
            }

            }else{
            res.status(401).json({
                message: "Invalid Password"
            })
        }

    }catch(err){
    res.status(500).json({
        message: "Invalid Login"
    })
   }
}