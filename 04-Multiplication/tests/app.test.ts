import { ServerApp } from './../src/presentation/server-app';
describe('Test App.ts', () => {

    test('Debe llamar Server.run con atributos', async () => {

        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '19', '-l', '15', '-n', 'test-file', '-s', '-d', 'directorio'];

        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 19,
            limit: 15,
            filename: 'test-file',
            showTable: true,
            fileDestination: 'directorio'
        })
        

    })

})