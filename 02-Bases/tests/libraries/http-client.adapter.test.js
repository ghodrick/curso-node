const { http } = require("../../src/libraries/http-client.adapter");



describe('http-client.js', () => {


    test('http.get() should work', async () => {

        const data = await http.get('https://jsonplaceholder.typicode.com/todos/1');

        expect(data).toEqual({
            userId: expect.any(Number),
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean)
        });

    });

});