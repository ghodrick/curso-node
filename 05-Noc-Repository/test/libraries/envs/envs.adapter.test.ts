import { envs } from "./../../../src/libraries/envs/envs.adapter";
describe("envs.adapter.ts", () => {
	test("Debe devolver env options", () => {
		expect(envs).toEqual({
			PORT: 3000,
			MAILER_SERVICE: "gmail",
			MAILER_EMAIL: "ghodrick991@gmail.com",
			MAILER_SECRET_KEY: "tqcvmxepzwrihnep",
			ENVIRONMENT: "development",
			MONGO_URL: "mongodb://Ghodrick:exampletest@localhost:27017",
			MONGO_DB_NAME: "NOC-TEST",
			MONGO_USER: "Ghodrick",
			MONGO_PASS: "exampletest",
		});
	});

    test('Debe devolver un error si no se encuentra el env', async () => {

        jest.resetModules();

        process.env.PORT = "ABC";

        try {
            await import('../../../src/libraries/envs/envs.adapter');

            expect(true).toBe(false);

        }
        catch (error)
        {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })

});
