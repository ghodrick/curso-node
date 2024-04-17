const { http } = require("../libraries/http-client.adapter");

const getPokemonByID = async (id) => {
	try {
		const pokemon = await http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

		return pokemon.name;
	} catch (error) {
		throw new Error(`POKEMON no encontrado: ${id}`);
	}
};

module.exports = {
	getPokemonByID,
};
