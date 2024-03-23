
const buildMakePerson = ({getUUID}) => {
	return ({ name, birthdate }) => {
		return {
			id: getUUID(),
			name: name,
			birthdate: birthdate,
			age: new Date().getFullYear() - new Date(birthdate).getFullYear(),
		};
	};
};

module.exports = {
	buildMakePerson,
};
