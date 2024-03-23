interface Hero {
    id: number;
    name: string;
    owner: string;
}

export const heroes: Hero[] = [
	{
		id: 1,
		name: "Batman",
		owner: "DC",
	},
	{
		id: 2,
		name: "Spiderman",
		owner: "Marvel",
	},
	{
		id: 3,
		name: "Superman",
		owner: "DC",
	},
];