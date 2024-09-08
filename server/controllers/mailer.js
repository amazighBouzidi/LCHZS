import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from "dotenv"

dotenv.config();

export async function sendWelcomeEmail(req, res) {
    const { newEmployer } = req;

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.PASSWORD_ADMIN
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Our Website",
            link: 'http://localhost:5173/'
        }
    })

    let response = {
        body: {
            name: "Welcome to Our Website!",
            intro: `Welcome to Our Website! Your account has been successfully created.`,
            action: {
                instructions: `Your temporary password is: ${newEmployer.password}. We suggest you change your password for stronger security.`,
                button: {
                    text: 'Change Password',
                    link: 'http://localhost:5173/change-password'
                }
            },
            outro: "Thank you for joining us!"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.EMAIL_ADMIN,
        to: newEmployer.email,
        subject: "Welcome to Our Website!",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        res.status(201).json({ msg: 'Employer Ajouter Avec Succes', addEmployer: newEmployer });
    }).catch(error => {
        return res.status(500).json({ error })
    })
}

export async function  handlerTest(req, res) {
    const { newEmployer } = req;
    console.log("i arrived here")
    res.status(201).json({ msg: 'Employer Ajouter Avec Succes', addEmployer: newEmployer });
}