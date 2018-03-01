import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ControlValueAccessor } from '@angular/forms';
import 'rxjs/Rx';
import { IDualListBoxActionIcon, IItemsMovedEvent, IListBoxItem } from './models';
export declare class DualListBoxComponent implements OnInit, ControlValueAccessor {
    fb: FormBuilder;
    data: Array<{}>;
    availableSearch: string;
    selectedSearch: string;
    valueField: string;
    textField: string;
    title: string;
    debounceTime: number;
    moveAllButton: boolean;
    availableText: string;
    selectedText: string;
    availableFilterPlaceholder: string;
    selectedFilterPlaceholder: string;
    icons: IDualListBoxActionIcon;
    onAvailableItemSelected: EventEmitter<{} | Array<{}>>;
    onSelectedItemsSelected: EventEmitter<{} | Array<{}>>;
    onItemsMoved: EventEmitter<IItemsMovedEvent>;
    searchTermAvailable: string;
    searchTermSelected: string;
    availableItems: Array<IListBoxItem>;
    selectedItems: Array<IListBoxItem>;
    listBoxForm: FormGroup;
    availableListBoxControl: FormControl;
    selectedListBoxControl: FormControl;
    availableSearchInputControl: FormControl;
    selectedSearchInputControl: FormControl;
    iconClasses: IDualListBoxActionIcon;
    _onChange: (_: any) => void;
    _onTouched: () => void;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    /**
     * Move all items from available to selected
     */
    moveAllItemsToSelected(): void;
    /**
     * Move all items from selected to available
     */
    moveAllItemsToAvailable(): void;
    /**
     * Move marked items from available items to selected items
     */
    moveMarkedAvailableItemsToSelected(): void;
    /**
     * Move marked items from selected items to available items
     */
    moveMarkedSelectedItemsToAvailable(): void;
    /**
     * Move single item from available to selected
     * @param item
     */
    moveAvailableItemToSelected(item: IListBoxItem): void;
    /**
     * Move single item from selected to available
     * @param item
     */
    moveSelectedItemToAvailable(item: IListBoxItem): void;
    /**
     * Function to pass to ngFor to improve performance, tracks items
     * by the value field
     * @param index
     * @param item
     * @returns {any}
     */
    trackByValue(index: number, item: {}): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    /**
     * Utility method to get values from
     * selected items
     * @returns {string[]}
     */
    private getValues();
}
