import { createTransport } from 'nodemailer';


export const SendMail = async (text) => {
    const trnasport = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user:process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    await trnasport.sendMail({
        subject: 'Message From Smart Form web',
        from:process.env.SMTP_MAIL ,
        to: process.env.SMTP_MAIL,
        text
    })
}