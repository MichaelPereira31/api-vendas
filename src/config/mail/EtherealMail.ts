const nodemailer = require("nodemailer");
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
interface IMailContact{
    name: string;
    email: string;
}
interface ITemplateVariable{
    [key :string]:string | number;
}
interface IParseMailTemplate{
    template: string;
    variables:ITemplateVariable;
}

interface ISendMail{
    to: IMailContact,
    from?: IMailContact;
    subject?: string;
    tempateData: IParseMailTemplate;
}

export default class EtherealMail{
    static async sendMail({to,from,subject,tempateData}:ISendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();
        const handlebarsMailTemplate = new HandlebarsMailTemplate()
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
            from: {
                name: from?.name || 'Equipe API vendas',
                address: from?.email || 'equipe@apivenda.com.br'
            },
            to:{
                name: to.name,
                address: to.email,
            },
            subject: 'Recuperação de senha',
            html: await handlebarsMailTemplate.parse(tempateData)
        })

        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}