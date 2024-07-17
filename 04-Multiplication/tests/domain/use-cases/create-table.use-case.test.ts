import { CreateTable } from './../../../src/domain/use-cases/create-table.use-case';

describe("CreateTableUseCase", () => {


    test('Debe crear una tabla con los valores por defecto', () => {

        const createTable = new CreateTable();

        const limite = 5;

        const table = createTable.execute({base: 2, limit: limite});

        const filas = table.split('\n').length;

        const filasExtra = 5;

        expect(createTable).toBeInstanceOf(CreateTable);

        expect(table).toContain('2 x 1 = 2');

        expect(filas).toBe(limite + filasExtra);

    });

    test('Debe crear una tabla con valores custom', () => {

        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable();

        const tabla = createTable.execute(options);

        const filas = tabla.split("\n").length;

        expect(tabla).toContain('3 x 15 = 45');

        expect(filas).toBe(options.limit + 5);
        

    })

})