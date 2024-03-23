import { findHeroById } from "./services/hero.service";


let heroe = findHeroById(3);

console.log(heroe?.name ?? 'Heroe no encontrado');