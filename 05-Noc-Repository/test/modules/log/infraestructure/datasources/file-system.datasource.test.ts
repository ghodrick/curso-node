import fs from "fs";
import path from "path";
import { LogEntity } from "../../../../../src/modules/logs/domain/entities/log.entity";
import { FileSystemDatasource } from './../../../../../src/modules/logs/infrastructure/datasources/file-system.datasource';

describe("FilesystemDatasource", () => {
	const logPath = path.join(__dirname, "../../../../../logs");

	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	test("Debe comprobar que se crean ficheros", () => {

        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-low.log', 'logs-medium.log']);

    });

    test('Debe guardar un log en el fichero logs-all', async () => {

        const fileSystemDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: 'low',
            message: 'test message',
            origin: 'file-system.datasource.ts',
        });

        fileSystemDatasource.saveLog(log);

        await new Promise(resolve => setTimeout(resolve, 100));

        const logs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(logs).toContain(JSON.stringify(log));

    });

    test('Debe guardar un log en el fichero logs-all y logs-medium', async () => {

        const fileSystemDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: 'low',
            message: 'test message',
            origin: 'file-system.datasource.ts',
        });

        fileSystemDatasource.saveLog(log);

        await new Promise(resolve => setTimeout(resolve, 100));

        const logsAll = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        await new Promise(resolve => setTimeout(resolve, 100));

        //const logsMedium = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(logsAll).toContain(JSON.stringify(log));

        //expect(logsMedium).toContain(JSON.stringify(log));

    });

    test('Debe guardar un log en el fichero logs-all y logs-high', async () => {

        const fileSystemDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: 'high',
            message: 'test message',
            origin: 'file-system.datasource.ts',
        });

        fileSystemDatasource.saveLog(log);

        await new Promise(resolve => setTimeout(resolve, 100));

        const logsAll = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        const logsHigh = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(logsAll).toContain(JSON.stringify(log));

        expect(logsHigh).toContain(JSON.stringify(log));

    });

    test('Debe devolver todos los logs', async () => {

        const fileSystemDatasource = new FileSystemDatasource();

        const log = new LogEntity({
            level: 'high',
            message: 'test message',
            origin: 'file-system.datasource.ts',
        });

        fileSystemDatasource.saveLog(log);

        const logs = await fileSystemDatasource.getLogs('high');

        expect(logs).toHaveLength(1);

        expect(logs[0]).toEqual(log);


    });

    test('Debe devolver un array vacío si no hay logs', async () => {


        const fileSystemDatasource = new FileSystemDatasource();

        const logs = await fileSystemDatasource.getLogs('high');

        expect(logs).toEqual([]);

    })

});
