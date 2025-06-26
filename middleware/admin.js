import jwt from "jsonwebtoken"
const JWT_ADMIN_PASSWORD = "iamadmin";



function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded= jwt.verify(token,JWT_ADMIN_PASSWORD)

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message:"ypu are not signed in"
        })
    }
}

export default adminMiddleware;