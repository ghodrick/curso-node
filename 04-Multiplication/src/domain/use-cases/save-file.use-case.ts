import fs from "fs";

export interface SaveFileUseCase {
	execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
	fileContent: string;
	fileDestination?: string;
	filename?: string;
}

export class SaveFile implements SaveFileUseCase {
	//Aquí se pasaría un repositorio
	constructor() {}

	execute({ fileContent, fileDestination = "outputs", filename = "table" }: SaveFileOptions) {
		try {
			const output = `${fileDestination}/${filename}.txt`;

			fs.mkdirSync(fileDestination, { recursive: true });

			fs.writeFileSync(output, fileContent);

			return true;
		} catch (error) {
			console.log(error);

			return false;
		}
	}
}
