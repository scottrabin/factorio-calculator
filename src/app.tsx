import React from "react";
import { getFactorioData } from "./data-loader";

const path = "/Users/scottrabin/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/";

interface IApplicationState {
    data: any;
}

export class Application extends React.Component<{}, IApplicationState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: null,
        };
    }

    public render() {
        return [
            <h1>Hello from React!</h1>,
            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>,
        ];
    }

    public async componentWillMount() {
        const data = await getFactorioData(path, "");
        (window as any).data = data;
        this.setState({ data });
    }
}
