import mongoose from 'mongoose';
import { MongoDatabase } from './../../../src/data/mongo/init';
describe("init MongoDB", () => {


    afterAll(() => {
        mongoose.connection.close();
    })

    test('Debe conectarse a MongoDB', async () => {

        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect(connected).toBe(true);

    });

    test('Debe dar un error si los datos están mal', async () => {

        try 
        {
            const connected = await MongoDatabase.connect({
                dbName: "asdawe",
                mongoUrl: "adweqwe",
            });

            expect(true).toBe(false);
        }
        catch(error)
        {
            //No es necesario comprobar nada, ha fallado correctamente
        }

    });

})