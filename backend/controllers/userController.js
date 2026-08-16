import { response } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
    try {
        // Hash the password
        const passwordHash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: passwordHash
        });

        await newUser.save();

        res.json({
            message: "User created successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating user"
        });
    }
}


export async function loginUser(req, res) {
    try {
        // Find user by email
        const user = await User.findOne({
            email: req.body.email
        });

        console.log(user);

        // Check whether user exists
        if (user == null) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        // Compare entered password with hashed password
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        // Check password
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Create payload
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            isBlocked: user.isBlocked,
            isEmailVerified: user.isEmailVerified,
            image: user.image
        };

        // Generate JWT token
        const token = jwt.sign(
            payload,
            "secretKey",
            {
                expiresIn: "48h"
            }
        );

        // Send token to client
        res.json({
            message: "Login Successful",
            token: token
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Invalid Login"
        });
    }
}