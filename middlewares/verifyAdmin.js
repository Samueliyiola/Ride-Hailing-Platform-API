import jwt from "jsonwebtoken";

const verifyAdmin = async(req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({Message : "No token provided, access denied!"});
        }
        const decoded = jwt.decode(token);
        req.user = decoded;
        if(req.user.role !== "admin"){
            return res.status(403).json({Message : "Access denied, you are not an admin!"});
        }
        next();
    }
    catch (error) {
        console.log(error);
        console.log(decoded);
        res.status(500).json({Message: "An error occured"});
    }
}


export default verifyAdmin;