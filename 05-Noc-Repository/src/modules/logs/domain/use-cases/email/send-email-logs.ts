import { EmailService } from "../../../../../libraries/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
	execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
	constructor(
		private readonly emailService: EmailService,
		private readonly logRepository: LogRepository,
	) {}
	async execute(to: string | string[]) {
		let devolver = false;

		const { attachments, htmlBody, subject } = this.prepareEmailContent();

		try {
			const sent = await this.emailService.sendEmail({ to, subject, htmlBody, attachments });

			if (!sent) {
				throw new Error("Email log is not sent");
			}

			const log = new LogEntity({
				message: `Email sent`,
				level: "low",
				origin: "send-email-logs.ts",
			});

			this.logRepository.saveLog(log);

			devolver = true;
		} catch (error) {
			const log = new LogEntity({
				message: `${error}`,
				level: "high",
				origin: "send-email-logs.ts",
			});

			this.logRepository.saveLog(log);

			devolver = false;
		}

		return devolver;
	}

	prepareEmailContent = () => {
		const subject = "Logs del servidor";

		const htmlBody = `
                    <h3> Logs de sistema - NOC </h3>
                    <p>Lorem ipsum</p>
                    <p>Ver logs adjuntos</p>`;

		const attachments = [
			{ filename: `logs-all.log`, path: "./logs/logs-all.log" },
			{ filename: `logs-high.log`, path: "./logs/logs-high.log" },
			{ filename: `logs-medium.log`, path: "./logs/logs-medium.log" },
		];

		return {
			subject,
			htmlBody,
			attachments,
		};
	};
}
