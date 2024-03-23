const { http } = require("../libraries/http-client.adapter");

const getPokemonByID = async (id) => {
	const pokemon = await http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

	return pokemon.name;
};

module.exports = {
	getPokemonByID,
};
