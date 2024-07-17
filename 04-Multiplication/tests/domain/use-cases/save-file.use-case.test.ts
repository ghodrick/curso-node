import fs from "fs";
import { SaveFile } from "./../../../src/domain/use-cases/save-file.use-case";

describe("SaveFileUseCase", () => {

    const folderCustom = "custom-outputs";

	const options = {
		fileContent: "custom content",
		fileDestination: `${folderCustom}/file-destination`,
		filename: "custom-table-name",
	};

	beforeEach(() => {
		jest.clearAllMocks();
		//Se ejecuta antes de cada prueba
		fs.rmSync("outputs", {
			recursive: true,
			force: true,
		});

		fs.rmSync(folderCustom, {
			recursive: true,
			force: true,
		});
	});

	afterEach(() => {
		//Se ejecuta después de cada prueba
		fs.rmSync("outputs", {
			recursive: true,
			force: true,
		});

		fs.rmSync(folderCustom, {
			recursive: true,
			force: true,
		});
	});

	test("Debe guardar el archivo con los datos por defecto", () => {
		const saveFile = new SaveFile();

		const option = {
			fileContent: "test content",
		};

		const output = "outputs/table.txt";

		const resultado = saveFile.execute(option);

		const fileExists = fs.existsSync(output);

		const fileContent = fs.readFileSync(output, { encoding: "utf-8" });

		expect(resultado).toBeTruthy();
		expect(fileExists).toBeTruthy();
		expect(fileContent).toBe(option.fileContent);
	});

	test("Debe guardar el archivo con valores custom", () => {
		const saveFile = new SaveFile();

		const output = `${options.fileDestination}/${options.filename}.txt`;

		const resultado = saveFile.execute(options);

		const fileExists = fs.existsSync(output);
		const fileContent = fs.readFileSync(output, { encoding: "utf-8" });

		expect(resultado).toBeTruthy();
		expect(fileExists).toBeTruthy();
		expect(fileContent).toBe(options.fileContent);
	});

	test("Debe devolver falso si el directorio no puede ser creado", () => {

		const saveFile = new SaveFile();

		const mockConsole = jest.fn();

		console.log = mockConsole;

		const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
			throw new Error('Error custom de espía');
		})

		const result = saveFile.execute(options);

		expect(result).toBe(false);

		mkdirSpy.mockRestore();

	})

	test("Debe devolver falso si el archivo no puede ser creado", () => {

		const saveFile = new SaveFile();

		const mockConsole = jest.fn();

		console.log = mockConsole;

		const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
			throw new Error('Error custom de espía de escritura');
		})

		const result = saveFile.execute({fileContent: "Hola"});

		expect(result).toBe(false);

		writeFileSpy.mockRestore();

	})
});
