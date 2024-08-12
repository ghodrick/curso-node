import { LogEntity } from '../../../src/modules/logs/domain/entities/log.entity';
import { LogRepositoryImpl } from './../../../src/modules/logs/infrastructure/repository/log.repository.impl';
describe('LogRepository', () => {

    const mockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsById: jest.fn()
    }

    const logRepository = new LogRepositoryImpl(mockDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Debe llamar a saveLog con propiedades', () => {

        const log = {
            level: 'high',
            message: 'hola'
        } as LogEntity;

        logRepository.saveLog(log);

        expect(mockDatasource.saveLog).toHaveBeenCalledWith(log);

    });

    test('Debe llamar a getLogs con propiedades', async () => {

        await logRepository.getLogs('high');

        expect(mockDatasource.getLogs).toHaveBeenCalledWith('high');

    })


})