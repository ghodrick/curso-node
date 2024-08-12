import { LogModel } from "../../../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
	async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create(log);

		console.log("Mongo log created:", newLog);
	}
	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({ level: severityLevel });

		const logEntities = logs.map((log) => LogEntity.fromObject(log));

		return logEntities;
	}

	async getLogsById(id: string): Promise<LogEntity | null> {
		const log = await LogModel.findById(id);

		return log ? LogEntity.fromObject(log) : null;
	}
}
