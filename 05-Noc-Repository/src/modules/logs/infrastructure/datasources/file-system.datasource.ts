import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
	private readonly logPath = "logs/";
	private readonly allLogsPath = "logs/logs-all.log";
	private readonly lowLogsPath = "logs/logs-low.log";
	private readonly mediumLogsPath = "logs/logs-medium.log";
	private readonly highLogsPath = "logs/logs-high.log";

	constructor() {
		this.createLogsFiles();
	}

	private createLogsFiles = () => {
		if (!fs.existsSync(this.logPath)) {
			fs.mkdirSync(this.logPath);
		}
		const ficherosLog = [this.allLogsPath, this.lowLogsPath, this.mediumLogsPath, this.highLogsPath];

		ficherosLog.forEach((path) => {
			if (!fs.existsSync(path)) {
				fs.writeFileSync(path, "");
			}
		});
	};

	async saveLog(log: LogEntity): Promise<void> {
		
		const jsonLog = `${JSON.stringify(log)}\n`;

		fs.appendFileSync(this.allLogsPath, jsonLog);

		const mapperLog = {
			'low': this.lowLogsPath,
			'medium': this.mediumLogsPath,
			'high': this.highLogsPath
		}

		const archivoGuardar = mapperLog[log.level];

		fs.appendFileSync(archivoGuardar, jsonLog);

	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		

		const mapperLog = {
			'low': this.lowLogsPath,
			'medium': this.mediumLogsPath,
			'high': this.highLogsPath
		}

		if (!mapperLog[severityLevel])
		{
			throw new Error(`SeverityLevel: ${severityLevel} no implementado`);
		}

		const archivoLeer = mapperLog[severityLevel];

		const content = fs.readFileSync(archivoLeer, 'utf-8');

		if (content === '')
		{
			return [];
		}

		let devolver: LogEntity[] = [];

		content.split("\n").forEach(log => {

			if (log !== "")
			{
				devolver.push(LogEntity.fromJSON(log));
			}

		})

		return devolver;

	}

	async getLogsById(id: string): Promise<LogEntity | null> {
		const content = fs.readFileSync(this.allLogsPath, 'utf-8');
		const logs = content.split("\n").filter(log => log !== "");

		const log = logs.find(log => log.includes(`"id":"${id}"`));
		return log ? LogEntity.fromJSON(log) : null;
	}
}
