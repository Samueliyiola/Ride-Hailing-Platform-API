import jwt from "jsonwebtoken";
const verifyUser = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({Message : "You are not authorized to do this!"});
    }
    const decoded = jwt.decode(token);
    req.user = decoded;
    if(req.user.role == "user"){
        next();
    }
    return res.status().json({Message : "You are not authorized to do this!"});
}


export default verifyUser;