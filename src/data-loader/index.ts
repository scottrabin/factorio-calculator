import * as child_process from "child_process";
import * as path from "path";

import { Ingredient } from "../models/ingredient";
import { Item } from "../models/item";
import { Recipe } from "../models/recipe";

interface IFactorioData {
    items: {
        [id: string]: Item;
    };
    recipes: {
        [id: string]: Recipe;
    };
}

type RawDiscreteIngredient = [string, number];

interface IRawFluidIngredient {
    amount: number;
    name: string;
    type: "fluid";
}

type RawIngredient
    = RawDiscreteIngredient
    | IRawFluidIngredient
    ;

interface IFactorioItemDefinition {
    icon: string;
    name: string;
}

interface IFactorioRecipeDefinitionCompact {
    name: string;
    ingredients: RawIngredient[];
    result: string;
}

interface IFactorioRecipeDefinitionNormal {
    name: string;
    normal: {
        ingredients: RawIngredient[];
        energy_required: number;
        result: string;
    };
}

type FactorioRecipeDefinition
    = IFactorioRecipeDefinitionCompact
    | IFactorioRecipeDefinitionNormal
    ;

interface IRawFactorioData {
    raw: {
        item: {
            [id: string]: IFactorioItemDefinition;
        };
        recipe: {
            [id: string]: FactorioRecipeDefinition;
        };
    };
}

export function getFactorioData(factorioPath: string, factorioModPath: string): Promise<IFactorioData> {
    const extractorScript = path.join(__dirname, "../../extract.lua");

    return new Promise((resolve) => {
        const child = child_process.spawn(extractorScript, [factorioPath, factorioModPath]);
        let data = "";

        child.stdout.on("data", (chunk) => data += chunk);

        child.on("exit", () => resolve(processRawFactorioData(data)));
    });
}

function processRawFactorioData(data: any): IFactorioData {
    const obj: IRawFactorioData = JSON.parse(data);
    (window as any).rawData = obj;

    const result: IFactorioData = {
        items: {},
        recipes: {},
    };

    for (const id of Object.keys(obj.raw.item)) {
        result.items[id] = new Item(
            id,
            obj.raw.item[id].icon,
            obj.raw.item[id].name,
        );
    }
    for (const id of Object.keys(obj.raw.recipe)) {
        result.recipes[id] = new Recipe(
            obj.raw.recipe[id].name,
            [result.items[id]],
            extractIngredients(result.items, obj.raw.recipe[id]),
        );
    }

    return result;
}

function extractIngredients(items: IFactorioData["items"], recipe: FactorioRecipeDefinition): Ingredient[] {
    let rawIngredients: RawIngredient[] = [];
    if (isRecipeCompact(recipe)) {
        rawIngredients = recipe.ingredients;
    }
    if (isRecipeNormal(recipe)) {
        rawIngredients = recipe.normal.ingredients;
    }

    return rawIngredients.map((ingr) => {
        const ingredient = normalizeIngredient(ingr);

        return {
            item: items[ingredient[0]],
            quantity: ingredient[1],
        };
    });
}

function normalizeIngredient(ingredient: RawIngredient): RawDiscreteIngredient {
    if (isIngredientFluid(ingredient)) {
        return [ingredient.name, ingredient.amount];
    }

    return ingredient;
}

function isRecipeCompact(recipe: FactorioRecipeDefinition): recipe is IFactorioRecipeDefinitionCompact {
    return recipe.hasOwnProperty("ingredients");
}

function isRecipeNormal(recipe: FactorioRecipeDefinition): recipe is IFactorioRecipeDefinitionNormal {
    return recipe.hasOwnProperty("normal");
}

function isIngredientFluid(ingredient: RawIngredient): ingredient is IRawFluidIngredient {
    return ingredient.hasOwnProperty("type") && (ingredient as IRawFluidIngredient).type === "fluid";
}
