
describe('App.js', () => {

    it('Should be true', () => {

        //1. Arrange
        const number1 = 10;
        const number2 = 20;

        //2. Act

        const result = number1 + number2 + 5;

        //3. Assert

        expect(result).toBe(35);
    })

});