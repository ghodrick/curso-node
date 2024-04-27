import fs from "fs";
import { argv } from "./adapters/args.adapter";

const { b: base, l: multiplicarHasta, s: mostrarTabla} = argv;

const outputPath = "outputs";

const nameFile = `tabla-${base}.txt`;

const output = `${outputPath}/${nameFile}`;

let body = "";

for (let i = 1; i <= multiplicarHasta; i++) {
	let multiplicacion = `${base} x ${i} = ${base * i}`;

	body += multiplicacion + "\n";
}

let contenido = `
================================
    Tabla del ${base}
================================

${body}`;

if (mostrarTabla) {
	console.log(contenido);
}

fs.mkdirSync(outputPath, { recursive: true });

fs.writeFileSync(output, contenido);
