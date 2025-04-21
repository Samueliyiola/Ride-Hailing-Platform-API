import jwt from "jsonwebtoken";
const verifyUser = (req, res, next) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(403).json({Message : "You are not authorized to do this!"});
        }
        const decoded = jwt.decode(token);
        req.user = decoded;
        if(req.user.role !== "user"){
            return res.status(403).json({Message : "You are not authorized to do this!"});
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({Message : "An error has occured with the verify user middleware!"});
    }
}


export default verifyUser;