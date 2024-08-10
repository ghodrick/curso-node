import { LogEntity } from './../../../../src/modules/logs/domain/entities/log.entity';
describe('Log Entity', () => {


    const data = {
        message: 'Hola',
        level: 'high',
        origin: 'log.entity.test.ts'
    } as const;

    test('Debe ser una instancia LogEntity', () => {

        const log = new LogEntity(data);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(data.message);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('Debe construir un LogEntity desde un json', () => {

        const json = `{"message":"Service https://valkysaurios.vercel.app is working","level":"low","createdAt":"2024-08-04T16:07:05.066Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJSON(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://valkysaurios.vercel.app is working');
        expect(log.createdAt).toBeInstanceOf(Date);


    });

    test('Debe crear un LogEntity desde un objeto', () => {

        const log = LogEntity.fromObject(data);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(data.message);
        expect(log.createdAt).toBeInstanceOf(Date);

    })
})