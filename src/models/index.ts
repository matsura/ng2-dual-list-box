export interface IListBoxItem {
    value: string;
    text: string;
}

export interface IItemsMovedEvent {
    available: Array<{}>;
    selected: Array<{}>;
    movedItems: Array<{}>;
}
