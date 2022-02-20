const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: process.env.SERVICE_NAME,
    auth: {
        user: process.env.SERVICE_EMAIL,
        pass: process.env.SERVICE_PASS
    }
});

const mailOptions = {
    from: process.env.SERVICE_EMAIL,
    to: 'random132mail@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `
        email send testing hello world body
    `
}

const mailSender = async (req,res) => {
   await transporter.sendMail(mailOptions, async function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + data.response)
        }
    })
}
module.exports = mailSender;