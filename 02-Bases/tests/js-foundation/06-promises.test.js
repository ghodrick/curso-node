const { getPokemonByID } = require("../../src/js-foundation/06-promises");

describe("Promises.js", () => {
	test("getPokemonByID should return a pokemon", async () => {
		const pokemonID = 1;

		const pokemonName = await getPokemonByID(pokemonID);

		expect(pokemonName).toBe("bulbasaur");
	});

	test("getPokemonByID should return an error", async () => {
		const pokemonID = 100000;

		try {
			await getPokemonByID(pokemonID);

			expect(true).toBeFalsy();
		} catch (error) {
			expect(error.message).toBe(`POKEMON no encontrado: ${pokemonID}`);
		}
	});
});
