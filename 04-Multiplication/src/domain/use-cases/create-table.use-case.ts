export interface CreateTableUseCase {
	execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
	base: number;
	limit?: number;
}

export class CreateTable implements CreateTableUseCase {
	//Le inyectaremos dependencias (DI - Dependency Injection)
	constructor() {}

	execute({ base, limit = 10 }: CreateTableOptions) {
		let body = "";

		for (let i = 1; i <= limit; i++) {
			let multiplicacion = `${base} x ${i} = ${base * i}`;

			body += multiplicacion + "\n";
		}

		let contenido = `
================================     
    Tabla del ${base}         
================================
${body}`;

		return contenido;
	}
}
