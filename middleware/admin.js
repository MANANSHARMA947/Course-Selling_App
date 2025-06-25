import jwt from "jsonwebtoken"
const JWT_ADMIN_PASSWORD = "iamadmin";



function adminMiddleware(){
    const token = req.headers.token;
    const decoded= jwt.verify(token,JWT_ADMIN_PASSWORD)

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).jsom({
            message:"ypu are not signed in"
        })
    }
}

export default adminMiddleware;