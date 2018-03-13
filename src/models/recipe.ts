import { Ingredient } from "./ingredient";
import { Item } from "./item";

export class Recipe {
    constructor(
        public readonly name: string,
        public readonly result: Item[],
        public readonly ingredients: Ingredient[],
    ) {}
}
