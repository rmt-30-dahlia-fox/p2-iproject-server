const nodemailer = require('nodemailer');

const automailer = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 486,
    auth: {
        user: 'nurqomarudin034@gmail.com',
        pass: 'ctiywujnqptyhizz'
    }
});

let mailDetails = {
    from: "nurqomarudin034@gmail.com",
    to: "nekolife123579@gmail.com",
    subject: "marQofy Mart Mail",
    text: "testing our application"
}

module.exports = { automailer, mailDetails };