import { createTransport } from "nodemailer";
import { envs } from "../envs/envs.adapter";

export interface Attachment {
	filename: string;
	path: string;
}

export interface SendMailOptions {
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
}
