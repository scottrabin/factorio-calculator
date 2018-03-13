interface IConfigInitializer {
    basePath: string;
    modsPath: string;
}

export class Configuration {
    public readonly factorioBasePath: string;
    public readonly factorioModsPath: string;

    constructor(props: IConfigInitializer) {
        this.factorioBasePath = props.basePath;
        this.factorioModsPath = props.modsPath;
    }
}
