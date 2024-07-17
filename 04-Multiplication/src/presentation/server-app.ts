import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
	base: number;
	limit: number;
	showTable: boolean;
    fileDestination?: string;
    filename?: string;
}

export class ServerApp {
	static run({ base, limit, showTable, fileDestination, filename }: RunOptions) {

        console.log('Server running...');
        
		const table = new CreateTable().execute({ base, limit });

        const tablaCreada = new SaveFile().execute({
            fileContent: table,
            fileDestination: fileDestination,
            filename: `${filename}-${base}`
        });

		if (showTable) {
            console.log(table)
		}

        tablaCreada ? console.log('File created') : console.error('No se ha podido crear');
	}
}
