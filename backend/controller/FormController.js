import { Form } from "../Model/FormModel.js"
import cloudinary from 'cloudinary'

export const CreateForm = async (req, res) => {

    try {

        const { name, email, gender, phone, state, city, avatar, birth } = req.body;
        let no=phone.toString()
        if (no.length!==10) {
            return res.status(404).json({
                success: false,
                message: 'Phone No must have 10 digit'
            })
        }
        const uploader = await cloudinary.v2.uploader.upload(avatar, { folder: 'smart-form' })
        await Form.create({
            name, email, gender, phone, state, city,
            avatar: {
                public_id: uploader.public_id,
                url: uploader.secure_url,
            },
            birth, user: req.user
        })

        res.status(201).json({
            success: true,
            message: 'Form has submitted'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const GetMyForm = async (req, res) => {

    try {
        const userId = req.user._id
        const user = await Form.find({ user: userId })

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

export const GetSingleFrm = async (req, res) => {

    try {
        const userId = req.user._id
        let form = await Form.findById(req.params.id)

        if (!form) {
            return res.status(400).json(({
                success: false,
                message: 'Form not found'
            }))
        }

        res.status(200).json({
            success: true,
            form
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const updateForm = async (req, res) => {

    try {
        const { uname, uemail, ugender, uphone, ustate, ucity } = req.body;

        let form = await Form.findById(req.params.id)

        if (!form) {
            return res.status(400).json(({
                success: false,
                message: 'Form not found'
            }))
        }
        form.name = uname;
        form.email = uemail;
        form.gender = ugender;
        form.phone = uphone;
        form.state = ustate;
        form.city = ucity;

        await form.save();

        res.status(200).json({
            success: true,
            message: `Form has been update`
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const DeleteMyform = async (req, res) => {

    try {
        let form = await Form.findById(req.params.id)

        if (!form) {
            return res.status(400).json(({
                success: false,
                message: 'Form not found'
            }))
        }
        await cloudinary.v2.uploader.destroy(form.avatar.public_id)
        await form.deleteOne()

        res.status(200).json({
            success: true,
            message: 'Form deleted',
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}