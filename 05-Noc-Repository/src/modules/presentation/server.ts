import { CronService } from "../../libraries/cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
	public static start() {
		console.log("Server started...");

		CronService.createJob("*/5 * * * * *", () => {
			const url = "https://google.es";

			new CheckService(logRepository).execute(url);
		});
	}
}
