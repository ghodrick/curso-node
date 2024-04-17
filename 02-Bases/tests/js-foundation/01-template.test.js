const {emailTemplate} = require('../../src/js-foundation/01-template');


describe('Template.js', () => {

    it('emailTemplate should contain a greeting', () => {

        expect(emailTemplate).toContain('Hi,');
        

    });

    it('emailTemplate should contain {{name}}', () => {

        expect(emailTemplate).toContain('{{name}}');
    });


});