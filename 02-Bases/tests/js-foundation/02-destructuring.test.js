const { characters } = require("../../src/js-foundation/02-destructuring");


describe('Destructuring.js', () => {

    it('Characters should contain Flash and Superman', () => {

        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');

    })

    it('First character should be Flash, and second Superman', () => {

        const [first, second] = characters;

        expect(first).toBe('Flash');
        expect(second).toBe('Superman');

    })


});