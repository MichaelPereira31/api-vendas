const nodemailer = require("nodemailer");

interface ISendMail{
    to: string;
    body: string;
}

export default class EtherealMail{
    static async sendMail({to,body}:ISendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();

        const transport = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth:{
                user: account.user,
                pass: account.pass
            }
        })

        const message = await transport.sendMail({
            from: 'equipe@apivenda.com.br',
            to,
            subject: 'Recuperação de senha',
            text: body
        })

        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}