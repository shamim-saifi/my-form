import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    phone: Number,
    state: String,
    city: String,
    birth:Date,
    avatar:{
        public_id:String,
        url:String,
    },
    user: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
    }

});

export const Form = mongoose.model('form', formSchema)


