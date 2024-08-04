import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect({mongoUrl, dbName}: ConnectionOptions) {

        try {
            
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            });

            console.log('Mongo connected');

        }
        catch (error)
        {
            console.log('Mongo connection error');

            throw error;
        }

    }
}