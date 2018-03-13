import React from "react";
import { connect } from "react-redux";

import { ItemList } from "./components/item-list";
import { getFactorioData } from "./data-loader";
import { Item } from "./models/item";
import { Recipe } from "./models/recipe";
import { AppState } from "./store";

interface ApplicationProps {
    paths: AppState["config"]["paths"];
}

interface ApplicationState {
    data: {
        items: { [id: string]: Item; };
        recipes: { [id: string]: Recipe; };
    };
}

class ApplicationComponent extends React.Component<ApplicationProps, ApplicationState> {
    constructor(props: ApplicationProps) {
        super(props);
        this.state = {
            data: {
                items: {},
                recipes: {},
            },
        };
    }

    public async componentWillMount() {
        const data = await getFactorioData(this.props.paths.base, "");
        (window as any).data = data;
        this.setState({ data });
    }

    public render() {
        return (
            <div>
                <h1>Hello from React!</h1>
                <ItemList items={Object.keys(this.state.data.items).map((k) => this.state.data.items[k])} />
            </div>
        );
    }
}

export const Application = connect(
    (state: AppState) => {
        return {
            paths: state.config.paths,
        };
    },
)(ApplicationComponent);
