// // controllers/mailController.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// export const generateMailContent = async (req, res) => {
//     try {
//         const { prompt, userDetails } = req.body;
//         let fullPrompt = prompt;
//         if (userDetails) {
//             const detailsString = Object.entries(userDetails)
//                 .map(([key, value]) => `${key}: ${value}`)
//                 .join('\n');
//             fullPrompt += `\n\nUser details:\n${detailsString}`;
//         }

//         const result = await model.generateContent({
//             contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
//             generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
//         });

//         const responseText = await result.response.text();
//         const [subjectLine, ...bodyLines] = responseText.split('\n');
//         const subject = subjectLine.replace('Subject:', '').trim();
//         const body = bodyLines.join('\n').trim();

//         res.json({ subject, body });
//     } catch (error) {
//         res.status(500).json({ message: 'Error generating mail content' });
//     }
// };

// export const sendMail = async (req, res) => {
//     try {
//         const { to, subject, text, senderEmail, senderPassword } = req.body;
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: { user: senderEmail, pass: senderPassword },
//         });

//         const mailOptions = { from: senderEmail, to, subject, text };
//         const info = await transporter.sendMail(mailOptions);
//         res.json({ message: 'Email sent successfully', response: info.response });
//     } catch (error) {
//         res.status(500).json({ message: 'Error sending email' });
//     }
// };


import transporter from '../config/mailer.js';
import { generateMailContent } from '../services/mailService.js';

export const sendMail = async (req, res) => {
    try {
        const { email, tempPassword, prompt } = req.body;
        const mailContent = await generateMailContent(prompt);

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: mailContent.subject,
            text: mailContent.body
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email Sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
