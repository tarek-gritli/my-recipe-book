import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const checkAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token,process.env.JWT_KEY,(err)=>{
            if(err) return res.sendStatus(403)
            next();
        }) 
    }
    else {
        res.sendStatus(401);
    }
}