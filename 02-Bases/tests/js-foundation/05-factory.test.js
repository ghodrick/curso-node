const { buildMakePerson } = require("../../src/js-foundation/05-factory");


describe('Factory.js', () => {

    const getUUID = () => "12345";

    test('buildMakePerson should return a function', () => {

        const makePerson = buildMakePerson({
            getUUID
        });

        expect(typeof makePerson).toBe('function');

    });

    test('makePerson should return a person', () => {

        const makePerson = buildMakePerson({
            getUUID
        });

        const person = makePerson({
            name: 'John Doe',
            birthdate: '1990-01-01'
        })

        expect(person).toEqual({
            id: "12345",
            name: "John Doe",
            birthdate: "1990-01-01",
            age: 34
        });

    });


});