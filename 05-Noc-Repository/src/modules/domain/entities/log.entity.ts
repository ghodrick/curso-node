export type LogSeverityLevel = "low" | "medium" | "high";

export interface LogEntityOptions {
	level: LogSeverityLevel;
	message: string;
	createdAt?: Date;
	origin: string;
}
export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(options: LogEntityOptions) {
		const { message, level, origin, createdAt = new Date() } = options;

		this.message = message;
		this.level = level;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	static fromJSON = (json: string): LogEntity => {
		const { message, level, createdAt, origin } = JSON.parse(json);

		if (!message && !level && !createdAt) {
			throw new Error(`Objeto no válido: ${json}`);
		}

		const log = new LogEntity({
			message,
			level,
			createdAt,
			origin,
		});

		return log;
	};
}
