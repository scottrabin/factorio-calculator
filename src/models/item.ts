export class Item {
    constructor(
        public readonly id: string,
        private readonly _icon: string,
        public readonly name: string,
    ) {}

    public get icon(): string {
        return this._icon || "";
    }
}
