import JWT from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';



export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                success: false,
                messsage:'UnAuthorized Access'
            })
        } else{
            next()
        }
    } catch (error) {
        console.log(error)
            res.status(401).send({
            success: false,
            error,
            messsage: 'Error in Admin Middleware',
        })
    }
}