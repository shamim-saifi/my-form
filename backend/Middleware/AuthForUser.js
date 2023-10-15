import jwt from 'jsonwebtoken'
import { User } from '../Model/UserModel.js';

export const isAuthUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'login to access this page'
            })          
        }

        const decode = jwt.verify(token, process.env.JWT)

        const user = await User.findById(decode._id);
        req.user = user;
        next()
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}