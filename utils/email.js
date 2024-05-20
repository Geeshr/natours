// const nodemailer = require('nodemailer');
// const htmlToText = require('html-to-text');
// const fs = require('fs');
// const path = require('path');

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(' ')[0];
//     this.url = url;
//     this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     if (process.env.NODE_ENV === 'production') {
//       // Sendgrid
//       return nodemailer.createTransport({
//         service: 'SendGrid',
//         auth: {
//           user: process.env.SENDGRID_USERNAME,
//           pass: process.env.SENDGRID_PASSWORD
//         }
//       });
//     }

//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//       }
//     });
//   }

//   // Helper function to load HTML template
//   loadTemplate(templateName) {
//     const templatePath = path.join(__dirname, `../views/email/${templateName}.html`);
//     return fs.readFileSync(templatePath, 'utf-8');
//   }

//   // Send the actual email
//   async send(template, subject) {
//     // 1) Load HTML based on a template
//     let html = this.loadTemplate(template);
    
//     // 2) Replace placeholders with actual values
//     html = html.replace(/{%firstName%}/g, this.firstName)
//                .replace(/{%url%}/g, this.url)
//                .replace(/{%subject%}/g, subject);

//     // 3) Define email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: htmlToText.fromString(html)
//     };

//     // 4) Create a transport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send('welcome', 'Welcome to the Natours Family!');
//   }

//   async sendPasswordReset() {
//     await this.send(
//       'passwordReset',
//       'Your password reset token (valid for only 10 minutes)'
//     );
//   }
// };
