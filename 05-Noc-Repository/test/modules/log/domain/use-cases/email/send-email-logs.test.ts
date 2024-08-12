import { LogEntity } from '../../../../../../src/modules/logs/domain/entities/log.entity';
import { LogRepository } from '../../../../../../src/modules/logs/domain/repository/log.repository';
import { SendEmailLogs } from './../../../../../../src/modules/logs/domain/use-cases/email/send-email-logs';


describe("SendEmailLogs", () => {

    const mockEmailService = {
        sendEmail: jest.fn().mockReturnValue(true)
    }

    const mockRepository: LogRepository = {
        saveLog: jest.fn().mockReturnValue(true),
        getLogs: jest.fn(),
        getLogsById: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })


	test("should send email and log success", async () => {
		
        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockRepository as LogRepository);

        const resultado = await sendEmailLogs.execute('test@test.com');

        expect(resultado).toBe(true);

        expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

	});

    test("should send email and log error", async () => {

        mockEmailService.sendEmail.mockReturnValue(false);

        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockRepository as LogRepository);

        const resultado = await sendEmailLogs.execute('test@test.com');

        expect(resultado).toBe(false);

        expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);

        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));


    })

});
