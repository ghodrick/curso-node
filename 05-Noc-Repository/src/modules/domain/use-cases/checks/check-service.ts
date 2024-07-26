import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly logRepository: LogRepository,
		private readonly onSuccess?: SuccessCallback,
		private readonly onError?: ErrorCallback,
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const resultado = await fetch(url);

			if (!resultado.ok) {
				throw new Error(`Error on check service ${url}`);
			}

			const log = new LogEntity(`Service ${url} is working`, "low");

			this.logRepository.saveLog(log);

			if (this.onSuccess) {
				this.onSuccess();
			}

			return true;
		} catch (error) {
			const errorMessage = `${url} is not working: ${error}`;

			const log = new LogEntity(errorMessage, "high");

			this.logRepository.saveLog(log);

			if (this.onError) {
				this.onError(`${error}`);
			}

			return false;
		}
	}
}
