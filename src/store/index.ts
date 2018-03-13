import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore as reduxCreateStore,
    Store,
} from "redux";

import { config, Configuration } from "./config";

export interface AppState {
    config: Configuration;
}

const rootReducer = combineReducers<AppState>({
    config,
});

export function createStore(): Store<AppState> {
    const middleware: any[] = [];
    const enhancers: any[] = [];

    const store: Store<AppState> = reduxCreateStore(
        rootReducer,
        {
            config: {
                paths: {
                    // tslint:disable-next-line
                    base: "/Users/scottrabin/Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents/",
                    mods: "",
                },
            },
        },
        compose(...(enhancers.concat(applyMiddleware(...middleware)))),
    );

    return store;
}
