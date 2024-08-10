import mongoose from "mongoose";
import { MongoDatabase } from "../../../../../src/data/mongo/init";
import { LogModel } from "../../../../../src/data/mongo/models/log.model";
import { envs } from "../../../../../src/libraries/envs/envs.adapter";
import { LogEntity } from "../../../../../src/modules/logs/domain/entities/log.entity";
import { MongoLogDatasource } from "../../../../../src/modules/logs/infrastructure/datasources/mongo-log.datasource";
describe("Mongo", () => {

    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: "low",
        message: "test",
        origin: "mongo-log.test.ts",
    });

	beforeAll(async () => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		});
	});

	afterEach(async () => {
		await LogModel.deleteMany();
	});

	afterAll(async () => {
		mongoose.connection.close();
	});

	test("Debe crear un log", async () => {

		const logSpy = jest.spyOn(console, "log");



		await logDatasource.saveLog(log);

		expect(logSpy).toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(Object));
	});

	test("Debe listar los log", async () => {

        await logDatasource.saveLog(log);
        
        const logs = await logDatasource.getLogs('low');

        expect(logs.length).toBe(1);

        expect(logs[0].level).toBe('low');

	});
});
