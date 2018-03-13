import * as path from "path";
import React from "react";

import { Configuration } from "../models/config";
import { Item } from "../models/item";

interface IItemIconProps {
    config: Configuration;
    item: Item;
}

export const ItemIcon: React.StatelessComponent<IItemIconProps> = (props) => {
    const contextPath = path.join(props.config.factorioBasePath, "data/base");
    const itemSrc = props.item.icon.replace(/__base__/, contextPath);
    return (
        <div className="item-icon">
            <img src={itemSrc} />
        </div>
    );
};
