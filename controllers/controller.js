const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const formidable = require('formidable');

exports.uploadPdf = (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, "../attachments");
    form.maxFileSize = 50 * 1024 * 1024; //5MB

    form.parse(req, (err, fields, files) => {
        if (err) throw err;

        const file = files.fileToUpload;
        console.log(file.originalFilename);

        const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));

        const newUrl = path.join(__dirname, "../attachments/") + fileName;

        try {
            fs.renameSync(file.filepath, newUrl);
        } catch (err) {
            console.log(err);
        }


        sendEmail(fields, fileName, newUrl);
    })

    const sendEmail = (fields, file, url) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: fields.email,
            to: process.env.EMAIL,
            subject: "Colloquio",
            html: '<div style="width:50%; margin:0 auto"><h1 align="center" style="color: #4696e5">Call The Future</h1><hr><p align="center">Ciao! Un nuovo utente ha mandato un curriculum. Lo trovi in allegato nella mail</p></div>',
            attachments: [{
                filename: file,
                path: url
            }]
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;

            console.log("Email sent");
        })
    }
}