import mongoose from "mongoose";
import { MongoDatabase } from "../../../../src/data/mongo/init";
import { LogModel } from './../../../../src/data/mongo/models/log.model';

describe("LogModel", () => {


    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        })
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    test('LogModel create', async () => {

        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData, 
            id: expect.any(String),
            createdAt: expect.any(Date),
        }));

        await LogModel.findByIdAndDelete(log.id);

    });

    test('Debe devolver el schema de LogModel', () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: expect.any(Function),
            level: {
              type: expect.any(Function),
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            createdAt: expect.any(Object)
          }))

    })


})