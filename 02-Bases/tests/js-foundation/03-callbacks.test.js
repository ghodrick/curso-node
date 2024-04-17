const { getUserById } = require("../../src/js-foundation/03-callbacks");



describe('Callbacks.js', () => {

    it('getUserById should return an error', (done) => {

        const id = 10;

        getUserById(id, (error, user) => {

            expect(error).toBe(`USUARIO no encontrado: ${id}`);
            expect(user).toBeUndefined();

            done();

        })

    });

    it('getUserById should return John Doe', () => {

        const id = 1;

        getUserById(id, (error, user) => {

            expect(error).toBeNull();
            expect(user).toEqual({ 
                id: 1, 
                name: "John Doe" 
            });

        })


    });

});