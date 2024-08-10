import mongoose from "mongoose";

interface ConnectionOptions {
	mongoUrl: string;
	dbName: string;
}

export class MongoDatabase {
	static async connect({ mongoUrl, dbName }: ConnectionOptions) {
		try {
			await mongoose.connect(mongoUrl, {
				dbName: dbName,
			});

			return true;
		} catch (error) {
			throw error;
		}
	}
}
