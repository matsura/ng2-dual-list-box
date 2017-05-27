import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import 'rxjs/Rx';
import * as _ from 'lodash';

import { IItemsMovedEvent, IListBoxItem } from './models';

@Component({
    selector: 'ng2-dual-list-box',
    templateUrl: 'dual-list-box.component.html',
    styles: [
        `.list-box {
            min-height: 200px;
            width: 100%;
         }
         .top100 {
            margin-top: 100px;
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
         .center-block {
            min-height: 50px;
         }
        /* Small Devices, Tablets */
        @media only screen and (max-width : 768px) {
            .sm-spacing {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
        /* Tablets in portrait */
        @media only screen and (min-width : 768px) and (max-width : 992px) {
            .sm-spacing {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
        /* Extra Small Devices, Phones */ 
        @media only screen and (max-width : 480px) {
            .sm-spacing {
                margin-top: 10px;
                margin-bottom: 10px;
            }
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
    @Input() availableText = 'Available items';
    // text displayed over the selected items list box
    @Input() selectedText = 'Selected items';

    // event called when item or items from available items(left box) is selected 
    @Output() onAvailableItemSelected: EventEmitter<{} | Array<{}>> = new EventEmitter<{} | Array<{}>>();
    // event called when item or items from selected items(right box) is selected 
    @Output() onSelectedItemsSelected: EventEmitter<{} | Array<{}>> = new EventEmitter<{} | Array<{}>>();
    // event called when items are moved between boxes, returns state of both boxes and item moved 
    @Output() onItemsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();

    // private variables to manage class 
    searchTermAvailable: string = '';
    searchTermSelected: string = '';
    availableItems: Array<IListBoxItem> = [];
    selectedItems: Array<IListBoxItem> = [];
    listBoxForm: FormGroup;
    availableListBoxControl: FormControl = new FormControl();
    selectedListBoxControl: FormControl = new FormControl();
    availableSearchInputControl: FormControl = new FormControl();
    selectedSearchInputControl: FormControl = new FormControl();

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
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe((search: string) => this.searchTermAvailable = search);
        this.selectedSearchInputControl
            .valueChanges
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
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
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.availableListBoxControl.value
        });
        this.availableListBoxControl.setValue([]);
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
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.selectedListBoxControl.value
        });
        this.selectedListBoxControl.setValue([]);
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
        // clear marked available items and emit event
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.availableListBoxControl.value
        });
        this.availableListBoxControl.setValue([]);
        this.availableSearchInputControl.setValue('');
    }

    /**
     * Move marked items from selected items to available items
     */
    moveMarkedSelectedItemsToAvailable(): void {

        // first move items to available
        this.availableItems = [...this.availableItems,
            ..._.intersectionWith(this.selectedItems, this.selectedListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // now filter available items to not include marked values
        this.selectedItems = [..._.differenceWith(this.selectedItems, this.selectedListBoxControl.value, (item: IListBoxItem, value: string) => item.value === value)];
        // clear marked available items and emit event
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.selectedListBoxControl.value
        });
        this.selectedListBoxControl.setValue([]);
        this.selectedSearchInputControl.setValue('');
    }

    /**
     * Function to pass to ngFor to improve performance, tracks items
     * by the value field
     * @param index
     * @param item
     * @returns {any}
     */
    trackByValue(index: number, item: {}): string {
        return item[this.valueField];
    }
} 
