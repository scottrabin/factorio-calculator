export interface Configuration {
    paths: {
        base: string;
        mods: string;
    };
}

export function config(state: Configuration, _: {}): Configuration {
    return state || {
        paths: {
            base: "",
            mods: "",
        },
    };
}
