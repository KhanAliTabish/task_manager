const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'alitabishkhan.udemy@gmail.com',
        subject: 'Welcome Email',
        text: `Hello ${name} ! Welcome to task manager.`,
    })
}


const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'alitabishkhan.udemy@gmail.com',
        subject: 'Cancellation Email',
        text: `Hello ${name} ! We are sorry that you are leaving.`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail

}