import * as React from "react";

import { Configuration } from "../models/config";
import { Item as ItemModel } from "../models/item";
import { ItemIcon } from "./item-icon";

interface IItemProps {
    config: Configuration;
    item: ItemModel;
}

export const Item: React.StatelessComponent<IItemProps> = (props) => {
    return (
        <div className="item">
            <ItemIcon item={props.item} config={props.config} />
            <span className="item-name">{props.item.name}</span>
        </div>
    );
};
