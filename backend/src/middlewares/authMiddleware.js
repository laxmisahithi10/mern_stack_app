// import express from "express";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token){
        return res.status(401).json({ message : "Unauthorized" });
    }
    try{
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user= verify;
        next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message : "Internal Server Error"});
    }
}