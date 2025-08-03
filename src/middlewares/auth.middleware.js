const { verifyToken } = require("./../utils/jwt.utils");

const authMiddleware = async (req,res,next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            msg: "Token not present."
        })
    }
    try{
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            msg: "Token is invalid."
        })
    }
}

module.exports = authMiddleware;