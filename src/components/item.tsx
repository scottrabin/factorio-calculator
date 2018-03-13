import * as React from "react";

import { Item as ItemModel } from "../models/item";
import { ItemIcon } from "./item-icon";

interface IItemProps {
    paths: {
        base: string;
        mods: string;
    };
    item: ItemModel;
}

export const Item: React.StatelessComponent<IItemProps> = (props) => {
    return (
        <div className="item">
            <ItemIcon item={props.item} paths={props.paths} />
            <span className="item-name">{props.item.name}</span>
        </div>
    );
};
