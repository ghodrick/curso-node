const originalArgv = process.argv;

const runCommand = async (args: string[]) => {
	process.argv = [...process.argv, ...args];

	const { argv } = await import("./../../src/adapters/args.adapter");

	return argv;
};

describe("Test args.adapters.ts", () => {

    beforeEach(() => {

        process.argv = originalArgv;

        jest.resetModules();

    })

	test("Debe devolver los valores por defecto", async () => {
		const argv = await runCommand(["-b", "5"]);

		expect(argv).toEqual(expect.objectContaining({
			_: [],
			b: 5,
			l: 10,
			s: false,
			n: "table",
			d: "./outputs",
		}));
	});

    test("Debe devolver la configuración con valores custom", async () => {

        const argv = await runCommand(["-b", "15", "-l", "20", "-s", "-n", "tabla", "-d", "./outputsCustom"]);

        expect(argv).toEqual(expect.objectContaining({
            b: 15,
            l: 20,
            s: true,
            n: "tabla",
            d: "./outputsCustom"
        }));


    })
});
