import * as path from "path";
import React from "react";

import { Item } from "../models/item";

interface IItemIconProps {
    paths: {
        base: string;
        mods: string;
    };
    item: Item;
}

export const ItemIcon: React.StatelessComponent<IItemIconProps> = (props) => {
    const contextPath = path.join(props.paths.base, "data/base");
    const itemSrc = props.item.icon.replace(/__base__/, contextPath);
    return (
        <div className="item-icon">
            <img src={itemSrc} />
        </div>
    );
};
