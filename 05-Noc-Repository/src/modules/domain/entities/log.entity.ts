
export type LogSeverityLevel = "low" | "medium" | "high";

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJSON = (json: string): LogEntity => {

        const { message, level, createdAt } = JSON.parse(json);

        if (!message && !level && !createdAt)
        {
            throw new Error(`Objeto no válido: ${json}`);
        }

        const log = new LogEntity(message, level);

        log.createdAt = new Date(createdAt);
        
        return log;
    }
}