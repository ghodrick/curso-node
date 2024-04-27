import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
	.option("b", {
		alias: "base",
		type: "number",
		demandOption: true,
		describe: "La base de la tabla de multiplicar",
	})
	.option("l", {
		alias: "limit",
		type: "number",
		default: 10,
		describe: "El límite hasta el que multiplicará",
	})
	.option("s", {
		alias: "showTable",
		type: "boolean",
		default: false,
		describe: "Mostrar tabla de multiplicar",
	})
	.option("n", {
		alias: "filename",
		type: "string",
		default: 'table',
		describe: "Nombre del fichero",
	})
	.option("d", {
		alias: "destination",
		type: "string",
		default: "./outputs",
		describe: "Mostrar tabla de multiplicar",
	})
	.check((argv) => {
		if (isNaN(argv.b) || argv.b < 1) {
			throw new Error("Error: La base debe ser un número");
		}
		return true;
	})
	.parseSync();
