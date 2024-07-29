import { EmailService } from "../../libraries/email/email.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource());

const emailService = new EmailService();

export class Server {
	public static start() {
		console.log("Server started...");

		//new SendEmailLogs(emailService, logRepository).execute("aaaa@gmail.com");

		// CronService.createJob("*/5 * * * * *", () => {
		// 	const url = "https://google.es";

		// 	new CheckService(logRepository).execute(url);
		// });
	}
}
