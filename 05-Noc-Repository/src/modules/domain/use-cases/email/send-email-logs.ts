import { EmailService } from "../../../../libraries/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}



export class SendEmailLogs implements SendLogEmailUseCase {
    
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}
    async execute(to: string | string[]) {

        let devolver = false;

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (sent) {
                throw new Error('Email log is not sent');
            }

            const log = new LogEntity({
                message: `Email sent`,
                level: 'low',
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log)

            devolver = true;

        }
        catch (error)
        {

            const log = new LogEntity({
                message: `${error}`,
                level: 'high',
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log)

            devolver = false;
        }

        return devolver;
    }




}