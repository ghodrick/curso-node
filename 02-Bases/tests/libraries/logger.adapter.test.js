const {buildLogger, logger: winstonLogger} = require("../../src/libraries/logger.adapter");


describe('Logger', () => {


    test('buildLogger should return a function', async () => {

        const logger = buildLogger("test");

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');

    });

    test('buildLogger.log should log a message', async () => {

        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');

        const logger = buildLogger("test");

        logger.log("test message");

        expect(winstonLoggerMock).toHaveBeenCalledWith('info', expect.objectContaining({
            level: 'info',
            message: 'test message',
            service: 'test'
        }));


    });

    test('buildLogger.error should log a message', async () => {

        const winstonLoggerMock = jest.spyOn(winstonLogger, 'log');

        const logger = buildLogger("test");

        logger.error("test message");

        expect(winstonLoggerMock).toHaveBeenCalledWith('info', expect.objectContaining({
            level: 'info',
            message: 'test message',
            service: 'test'
        }));


    });

});