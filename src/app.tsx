import React from "react";

import { Item } from "./components/item";
import { getFactorioData } from "./data-loader";
import { Configuration } from "./models/config";
import { Item as ItemModel } from "./models/item";
import { Recipe } from "./models/recipe";

const basePath = "/Users/scottrabin/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/";

interface IApplicationState {
    data: {
        items: { [id: string]: ItemModel; };
        recipes: { [id: string]: Recipe; };
    };
}

export class Application extends React.Component<{}, IApplicationState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: {
                items: {},
                recipes: {},
            },
        };
    }

    public render() {
        const ids = Object.keys(this.state.data.items);

        return [
            <h1>Hello from React!</h1>,
        ].concat(ids.map((id) => {
            return (
                <Item config={this.getConfig()} item={this.state.data.items[id]} />
            );
        }));
    }

    public async componentWillMount() {
        const data = await getFactorioData(basePath, "");
        (window as any).data = data;
        this.setState({ data });
    }

    private getConfig(): Configuration {
        return {
            factorioBasePath: basePath,
            factorioModsPath: "",
        };
    }
}
