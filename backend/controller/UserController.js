import { User } from "../Model/UserModel.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { SendMail } from "../Middleware/SendMail.js";



export const CreateNewUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Already Created Please Login"
            })
        }

        const hasPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hasPassword });

        const token = jwt.sign({ _id: user._id }, process.env.JWT)

        res.status(201).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 6 * 10 * 60 * 1000),
            sameSite:"none",
            secure:true,

        }).json({
            success: true,
            message: "user Registration has done",
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email and password"
            })
        }

        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: "invalid email and password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT)
        res.status(201).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 6 * 10 * 60 * 1000),
            sameSite:"none",
            secure:true,

        }).json({
            success: true,
            message: `wellcome ${user.name}`,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const LogoutUser = (req, res) => {
    try {

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            sameSite:"none",
            secure:true,

        }).json({
            success: true,
            message: "logout done",
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const UserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const Contact = async (req, res) => {
    try {
        const { name, email, comment } = req.body;

        const message = `Hi, my name is ${name}.\n\n And my email is ${email}.\n\n comment :- ${comment}`;

        await SendMail(message,)

        res.status(200).json({
            success: true,
            message:'Mail has been send'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
