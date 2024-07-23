import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "../libraries/cron/cron-service";

export class Server {
	public static start() {
		console.log("Server started...");

		CronService.createJob("*/5 * * * * *", () => {

			const url = 'https://google.es';

			new CheckService(
				() => console.log(`URL: ${url} ESTADO OK`),
				(error) => console.log(error),
			).execute(url);

		});
	}
}