const axios = require("axios");

const http = {
	get: async (url) => {
		const { data } = await axios.get(url);

		return data;
	}
};


module.exports = {
	http,
};
