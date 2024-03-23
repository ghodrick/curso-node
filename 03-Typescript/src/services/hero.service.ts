import { heroes } from "../data/heroes";

export const findHeroById = (id: number) => heroes.find((hero) => hero.id === id);