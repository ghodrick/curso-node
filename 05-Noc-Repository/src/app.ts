import { MongoDatabase } from "./data/mongo/init";
import { envs } from './libraries/envs/envs.adapter';
import { Server } from "./server/server";


(async () => {
	main();
})();

async function main() {

	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});

	Server.start();
}
