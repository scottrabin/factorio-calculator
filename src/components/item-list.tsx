import * as React from "react";
import { connect } from "react-redux";

import { Item } from "../components/item";
import { Item as ItemModel } from "../models/item";
import { AppState } from "../store";

interface ItemListProps {
    paths: {
        base: string;
        mods: string;
    };
}

interface ItemListOwnProps {
    items: ItemModel[];
}

const ItemListComponent: React.StatelessComponent<ItemListProps & ItemListOwnProps> = (props) => {
    return (
        <div className="item-list">
            {props.items.map((item) => {
                return (
                    <Item key={item.id} paths={props.paths} item={item} />
                );
            })}
        </div>
    );
};

export const ItemList = connect(
    (state: AppState, props: ItemListOwnProps) => {
        return {
            items: props.items,
            paths: state.config.paths,
        };
    },
)(ItemListComponent);
