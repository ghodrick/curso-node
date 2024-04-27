import { argv } from "./adapters/args.adapter";
import { ServerApp } from "./presentation/server-app";

(async () => {
	await main();
})();

async function main() {
	
    const { b: base, l: limit, s: showTable, n: filename, d: fileDestination} = argv;

    ServerApp.run({
        base,
        limit,
        showTable,
        filename,
        fileDestination
    });
}
