import jwt from "jsonwebtoken"
const JWT_USER_PASSWORD = "iammanan";


function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded= jwt.verify(token,JWT_USER_PASSWORD)

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).jsom({
            message:"ypu are not signed in"
        })
    }
}

export default userMiddleware;