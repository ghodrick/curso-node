const { getID } = require("../../src/libraries/uuid.adapter");



describe('UUIDAdapter.js', () => {


    test('getID should return a string', async () => {

        const id = getID();

        expect(typeof id).toBe('string');
        expect(id.length).toBe(36);

    });

});