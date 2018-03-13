import { Item } from "./item";

export class Ingredient {
    constructor(
        public readonly item: Item,
        public readonly quantity: number,
    ) {}
}
