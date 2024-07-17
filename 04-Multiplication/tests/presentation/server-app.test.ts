import fs from 'fs';
import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from './../../src/presentation/server-app';
describe("Server App", () => {

    const options = {
        base: 4,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        filename: 'test-filename'
    }

    beforeEach(() => {

        jest.clearAllMocks();

        fs.rmSync("test-destination", {
            force: true,
            recursive: true
        })

    })

    test('Debe ser instancia de ServerApp', () => {


        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);

    })

    test("Debe funcionar ServerApp con parámetros", () => {

        const logSpy = jest.spyOn(console, "log");
        const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenLastCalledWith('File created');

        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            filename: `${options.filename}-${options.base}`
        })

    })

    test('Debe funcionar con valores personalizados mockeados', () => {

        //Esto permite sustituir las funciones por una función que no hace nada, simplemente recibe los parámetros y simulamos su valor de retorno
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);
        const logMock = jest.fn();
        const logErrorMock = jest.fn();


        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        console.error = logErrorMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');

        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        })

        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            filename: `${options.filename}-${options.base}`
        });

        expect(logMock).toHaveBeenCalledWith('File created');
        expect(logErrorMock).not.toHaveBeenCalled();
    })

})