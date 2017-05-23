import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as _ from 'lodash';

import { IItemsMovedEvent, IListBoxItem } from './models';
import { SortOptions } from "./array.pipes";

@Component({
    selector: 'ng2-dual-list-box',
    templateUrl: 'dual-list-box.component.html',
    styles: [
        `.list-box {
            min-height: 200px;
            width: 100%;
         }
         .top80 {
            margin-top: 80px;
         }
         .bottom10 {
            margin-bottom: 10px;
         }
         .vertical-spacing-5 {
            margin-top: 5px;
            margin-bottom: 5px;
         }
        `
    ]
})
export class DualListBoxComponent implements OnInit {

    // array of items to display in left box 
    @Input() data: Array<{}> = [];
    // field to use for value of option
    @Input() valueField = 'id';
    // field to use for displaying option text 
    @Input() textField = 'name';
    // text to display as title above component 
    @Input() title: string;
    // time to debounce search output in ms 
    @Input() debounceTime = 500;
    // show/hide button to move all items between boxes 
    @Input() moveAllButton = true;
    // text displayed over the available items list box
    @Input() availableText: string = 'Available items';
    // text displayed over the selected items list box
    @Input() selectedText: string = 'Selected items';

    // event called when item or items from available items(left box) is selected 
    @Output() onAvailableItemSelected: EventEmitter<{} | Array<{}>> = new EventEmitter<{} | Array<{}>>();
    // event called when item or items from selected items(right box) is selected 
    @Output() onSelectedItemsSelected: EventEmitter<{} | Array<{}>> = new EventEmitter<{} | Array<{}>>();
    // event called when items are moved between boxes, returns state of both boxes and item moved 
    @Output() onItemsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();

    // private variables to manage class 
    private searchTermAvailable: string;
    private searchTermSelected: string;
    private availableItems: Array<IListBoxItem> = [];
    private selectedItems: Array<IListBoxItem> = [];
    private listBoxForm: FormGroup;
    private availableListBoxControl: FormControl = new FormControl();
    private selectedListBoxControl: FormControl = new FormControl();
    private availableSearchInputControl: FormControl = new FormControl();
    private selectedSearchInputControl: FormControl = new FormControl();
    private sortDirection: string = SortOptions.direction.ASC;

    constructor(public fb: FormBuilder) {

        this.listBoxForm = this.fb.group({
            availableListBox: this.availableListBoxControl,
            selectedListBox: this.selectedListBoxControl,
            availableSearchInput: this.availableSearchInputControl,
            selectedSearchInput: this.selectedSearchInputControl
        });
    }

    ngOnInit(): void {

        this.availableItems = [...this.data.map((item: {}, index: number) => ({
            value: item[this.valueField],
            text: item[this.textField]
        }))];
        this.availableListBoxControl
            .valueChanges
            .subscribe((items: Array<{}>) => this.onAvailableItemSelected.emit(items));
        this.selectedListBoxControl
            .valueChanges
            .subscribe((items: Array<{}>) => this.onSelectedItemsSelected.emit(items));
        this.availableSearchInputControl
            .valueChanges
           // .debounceTime(this.debounceTime)
           // .distinctUntilChanged()
            .subscribe((search: string) => this.searchTermAvailable = search);
        this.selectedSearchInputControl
            .valueChanges
           // .debounceTime(this.debounceTime)
           // .distinctUntilChanged()
            .subscribe((search: string) => this.searchTermSelected = search);
    }

    /**
     * Move all items from available to selected
     */
    moveAllItemsToSelected(): void {

        if (!this.availableItems.length) {
            return;
        }
        this.selectedItems = [...this.selectedItems, ...this.availableItems];
        this.availableItems = [];
    }

    /**
     * Move all items from selected to available
     */
    moveAllItemsToAvailable(): void {

        if (!this.selectedItems.length) {
            return;
        }
        this.availableItems = [...this.availableItems, ...this.selectedItems];
        this.selectedItems = [];
    }

    /**
     * Move marked items from available items to selected items
     */
    moveMarkedAvailableItemsToSelected(): void {

        // first move items to selected
        this.selectedItems = [...this.selectedItems,
            ..._.intersectionWith(this.availableItems, this.availableListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // now filter available items to not include marked values
        this.availableItems = [..._.differenceWith(this.availableItems, this.availableListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // clear marked available items
        this.availableListBoxControl.setValue([]);
    }

    /**
     * Move marked items from selected items to available items
     */
    moveMarkedSelectedItemsToAvailable(): void {

        // first move items to available
        this.availableItems = [...this.availableItems,
            ..._.intersectionWith(this.selectedItems, this.selectedListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // now filter available items to not include marked values
        this.selectedItems = [..._.differenceBy(this.selectedItems, this.selectedListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // clear marked available items
        this.selectedListBoxControl.setValue([]);
    }
} 