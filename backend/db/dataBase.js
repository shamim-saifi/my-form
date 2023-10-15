import mongoose from "mongoose";

export const db = () => {
    mongoose.connect(process.env.MONOG_URL).then((e) => {
        console.log(`database is connected to ${e.connection.host}`)
    }).catch((e) => {
        console.log(e)
    })
}