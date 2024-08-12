import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level]
            }
        })

        console.log('Nuevo log de Postgres creado', newLog);

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        });

        const logEntities = logs.map(log => {

            const dataLog = {
                ...log
            }

            //TODO: Arreglar problema con el enum del Level.

            return LogEntity.fromObject(dataLog)
        });

        return logEntities;
    }

    async getLogsById(id: string): Promise<LogEntity | null> {
        const log = await prismaClient.logModel.findUnique({
            where: { id: Number(id) }
        });

        if (!log) return null;

        const dataLog = {
            ...log
        }

        return LogEntity.fromObject(dataLog);
    }
}
