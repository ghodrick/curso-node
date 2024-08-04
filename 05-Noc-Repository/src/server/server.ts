import { CronService } from "../libraries/cron/cron.service";
import { FileSystemDatasource } from '../modules/logs/infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../modules/logs/infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from "../modules/logs/infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../modules/logs/infrastructure/repository/log.repository.impl";
import { CheckServiceMultiple } from './../modules/logs/domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource()
);

const MongoLogRepository = new LogRepositoryImpl(
	new MongoLogDatasource()
);

const PostgresLogRepository = new LogRepositoryImpl(
	new PostgresLogDatasource()
);

//const emailService = new EmailService();

export class Server {
	public static async start() {
		console.log("Server started...");

		//new SendEmailLogs(emailService, logRepository).execute("aaaa@gmail.com");

		/* const logs = await logRepository.getLogs("low");

		console.log(logs) */

		CronService.createJob("*/5 * * * * *", () => {
			const url = "https://valkysaurios.vercel.app";

			const logRepositoryUsar = [
				PostgresLogRepository,
				MongoLogRepository,
				fsLogRepository
			]

			new CheckServiceMultiple(logRepositoryUsar).execute(url);
		});
	}
}
