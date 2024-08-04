import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export interface LogDatasource {
    getLogs(severityLevel: LogSeverityLevel) : Promise<LogEntity[]>,
    saveLog(log: LogEntity) : Promise<void>
}