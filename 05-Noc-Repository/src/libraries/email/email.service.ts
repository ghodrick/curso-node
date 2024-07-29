import { createTransport } from "nodemailer";
import { envs } from "../envs/envs.adapter";

interface Attachment {
	filename: string;
	path: string;
}

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

export class EmailService {
	private transporter = createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	constructor() {}

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		let resultado = false;

		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments: attachments,
			});



		} catch (error) {

		}

		return resultado;
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = "Logs del servidor";

		const htmlBody = `
		 		<h3> Logs de sistema - NOC </h3>
		 		<p>Lorem ipsum</p>
		 		<p>Ver logs adjuntos</p>`;

		const attachments: Attachment[] = [
			{ filename: `logs-all.log`, path: "./logs/logs-all.log" },
			{ filename: `logs-high.log`, path: "./logs/logs-high.log" },
			{ filename: `logs-medium.log`, path: "./logs/logs-medium.log" },
		];

		return this.sendEmail({ to, subject, attachments, htmlBody });
	}
}
