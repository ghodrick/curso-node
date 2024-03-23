const { v4: uuidv4 } = require("uuid");

const getID = () => {

    return uuidv4();
}

module.exports = {
    getID
}