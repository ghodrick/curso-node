import { LogEntity } from '../../../../../../src/modules/logs/domain/entities/log.entity';
import { CheckService } from './../../../../../../src/modules/logs/domain/use-cases/checks/check-service';
describe("check-service", () => {

    
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();

    const errorCallback = jest.fn();

    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    })


	test("Debe llamar onSuccess cuando el fetch sea true", async () => {

        const resultado = await checkService.execute('https://google.es');

        expect(successCallback).toHaveBeenCalled();
        expect(resultado).toBe(true);
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });


    test("Debe llamar onError cuando el fetch sea false", async () => {

        const resultado = await checkService.execute('https://googlqweqwee.es');

        expect(successCallback).not.toHaveBeenCalled();
        expect(resultado).toBe(false);
        expect(errorCallback).toHaveBeenCalled();

    });

});
