import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'rxjs/Rx';
import * as _ from 'lodash/index';
var DualListBoxComponent = (function () {
    /**
     * @param {?} fb
     */
    function DualListBoxComponent(fb) {
        this.fb = fb;
        // field to use for value of option
        this.valueField = 'id';
        // field to use for displaying option text
        this.textField = 'name';
        // time to debounce search output in ms
        this.debounceTime = 500;
        // show/hide button to move all items between boxes
        this.moveAllButton = true;
        // text displayed over the available items list box
        this.availableText = 'Available items';
        // text displayed over the selected items list box
        this.selectedText = 'Selected items';
        // set placeholder text in available items list box
        this.availableFilterPlaceholder = 'Filter...';
        // set placeholder text in selected items list box
        this.selectedFilterPlaceholder = 'Filter...';
        // event called when item or items from available items(left box) is selected
        this.onAvailableItemSelected = new EventEmitter();
        // event called when item or items from selected items(right box) is selected
        this.onSelectedItemsSelected = new EventEmitter();
        // event called when items are moved between boxes, returns state of both boxes and item moved
        this.onItemsMoved = new EventEmitter();
        // private variables to manage class
        this.searchTermAvailable = '';
        this.searchTermSelected = '';
        this.availableItems = [];
        this.selectedItems = [];
        this.availableListBoxControl = new FormControl();
        this.selectedListBoxControl = new FormControl();
        this.availableSearchInputControl = new FormControl();
        this.selectedSearchInputControl = new FormControl();
        this.iconClasses = {
            moveAllToSelected: {
                directionIcon: 'glyphicon glyphicon-chevron-right',
                listIcon: 'glyphicon glyphicon-list'
            },
            moveAllToAvailable: {
                directionIcon: 'glyphicon glyphicon-chevron-left',
                listIcon: 'glyphicon glyphicon-list'
            },
            moveSingleToAvailable: 'glyphicon glyphicon-chevron-left',
            moveSingleToSelected: 'glyphicon glyphicon-chevron-right'
        };
        // control value accessors
        this._onChange = function (_) { };
        this._onTouched = function () { };
        this.listBoxForm = this.fb.group({
            availableListBox: this.availableListBoxControl,
            selectedListBox: this.selectedListBoxControl,
            availableSearchInput: this.availableSearchInputControl,
            selectedSearchInput: this.selectedSearchInputControl
        });
    }
    Object.defineProperty(DualListBoxComponent.prototype, "data", {
        /**
         * @param {?} items
         * @return {?}
         */
        set: function (items) {
            var _this = this;
            this.availableItems = (items || []).map(function (item, index) { return ({
                value: item[_this.valueField].toString(),
                text: item[_this.textField]
            }); }).slice();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DualListBoxComponent.prototype, "availableSearch", {
        /**
         * @param {?} searchTerm
         * @return {?}
         */
        set: function (searchTerm) {
            this.searchTermAvailable = searchTerm;
            this.availableSearchInputControl.setValue(searchTerm);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DualListBoxComponent.prototype, "selectedSearch", {
        /**
         * @param {?} searchTerm
         * @return {?}
         */
        set: function (searchTerm) {
            this.searchTermSelected = searchTerm;
            this.selectedSearchInputControl.setValue(searchTerm);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DualListBoxComponent.prototype, "icons", {
        /**
         * @param {?} icons
         * @return {?}
         */
        set: function (icons) {
            if (icons) {
                this.iconClasses = Object.assign({}, this.iconClasses, icons);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DualListBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.availableListBoxControl
            .valueChanges
            .subscribe(function (items) { return _this.onAvailableItemSelected.emit(items); });
        this.selectedListBoxControl
            .valueChanges
            .subscribe(function (items) { return _this.onSelectedItemsSelected.emit(items); });
        this.availableSearchInputControl
            .valueChanges
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe(function (search) { return _this.searchTermAvailable = search; });
        this.selectedSearchInputControl
            .valueChanges
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe(function (search) { return _this.searchTermSelected = search; });
    };
    /**
     * Move all items from available to selected
     * @return {?}
     */
    DualListBoxComponent.prototype.moveAllItemsToSelected = function () {
        if (!this.availableItems.length) {
            return;
        }
        this.selectedItems = this.selectedItems.concat(this.availableItems);
        this.availableItems = [];
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.availableListBoxControl.value
        });
        this.availableListBoxControl.setValue([]);
        this.writeValue(this.getValues());
    };
    /**
     * Move all items from selected to available
     * @return {?}
     */
    DualListBoxComponent.prototype.moveAllItemsToAvailable = function () {
        if (!this.selectedItems.length) {
            return;
        }
        this.availableItems = this.availableItems.concat(this.selectedItems);
        this.selectedItems = [];
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.selectedListBoxControl.value
        });
        this.selectedListBoxControl.setValue([]);
        this.writeValue([]);
    };
    /**
     * Move marked items from available items to selected items
     * @return {?}
     */
    DualListBoxComponent.prototype.moveMarkedAvailableItemsToSelected = function () {
        // first move items to selected
        this.selectedItems = this.selectedItems.concat(_.intersectionWith(this.availableItems, this.availableListBoxControl.value, function (item, value) { return item.value === value; }));
        // now filter available items to not include marked values
        this.availableItems = _.differenceWith(this.availableItems, this.availableListBoxControl.value, function (item, value) { return item.value === value; }).slice();
        // clear marked available items and emit event
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.availableListBoxControl.value
        });
        this.availableListBoxControl.setValue([]);
        this.availableSearchInputControl.setValue('');
        this.writeValue(this.getValues());
    };
    /**
     * Move marked items from selected items to available items
     * @return {?}
     */
    DualListBoxComponent.prototype.moveMarkedSelectedItemsToAvailable = function () {
        // first move items to available
        this.availableItems = this.availableItems.concat(_.intersectionWith(this.selectedItems, this.selectedListBoxControl.value, function (item, value) { return item.value === value; }));
        // now filter available items to not include marked values
        this.selectedItems = _.differenceWith(this.selectedItems, this.selectedListBoxControl.value, function (item, value) { return item.value === value; }).slice();
        // clear marked available items and emit event
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: this.selectedListBoxControl.value
        });
        this.selectedListBoxControl.setValue([]);
        this.selectedSearchInputControl.setValue('');
        this.writeValue(this.getValues());
    };
    /**
     * Move single item from available to selected
    \@param item
     * @param {?} item
     * @return {?}
     */
    DualListBoxComponent.prototype.moveAvailableItemToSelected = function (item) {
        this.availableItems = this.availableItems.filter(function (listItem) { return listItem.value !== item.value; });
        this.selectedItems = this.selectedItems.concat([item]);
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: [item.value]
        });
        this.availableSearchInputControl.setValue('');
        this.availableListBoxControl.setValue([]);
        this.writeValue(this.getValues());
    };
    /**
     * Move single item from selected to available
    \@param item
     * @param {?} item
     * @return {?}
     */
    DualListBoxComponent.prototype.moveSelectedItemToAvailable = function (item) {
        this.selectedItems = this.selectedItems.filter(function (listItem) { return listItem.value !== item.value; });
        this.availableItems = this.availableItems.concat([item]);
        this.onItemsMoved.emit({
            available: this.availableItems,
            selected: this.selectedItems,
            movedItems: [item.value]
        });
        this.selectedSearchInputControl.setValue('');
        this.selectedListBoxControl.setValue([]);
        this.writeValue(this.getValues());
    };
    /**
     * Function to pass to ngFor to improve performance, tracks items
    by the value field
    \@param index
    \@param item
    \@returns {any}
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    DualListBoxComponent.prototype.trackByValue = function (index, item) {
        return item[this.valueField];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DualListBoxComponent.prototype.writeValue = function (value) {
        if (this.selectedItems && value && value.length > 0) {
            this.selectedItems = this.selectedItems.concat(_.intersectionWith(this.availableItems, value, function (item, value) { return item.value === value; }));
            this.availableItems = _.differenceWith(this.availableItems, value, function (item, val) { return item.value === val; }).slice();
        }
        this._onChange(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DualListBoxComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DualListBoxComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Utility method to get values from
    selected items
    \@returns {string[]}
     * @return {?}
     */
    DualListBoxComponent.prototype.getValues = function () {
        return (this.selectedItems || []).map(function (item) { return item.value; });
    };
    return DualListBoxComponent;
}());
export { DualListBoxComponent };
DualListBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng2-dual-list-box',
                template: "<div class=\"row\" [formGroup]=\"listBoxForm\"> <div class=\"col-md-5 col-lg-5 col-sm-12\"> <h4 class=\"text-center vertical-spacing-5\">{{availableText}}</h4> <input type=\"text\" class=\"form-control vertical-spacing-5\" placeholder=\"{{availableFilterPlaceholder}}\" formControlName=\"availableSearchInput\" /> <select class=\"form-control list-box\" formControlName=\"availableListBox\" multiple> <option *ngFor=\"let item of availableItems | arrayFilter:['text', searchTermAvailable] | arraySort:['text', 'ASC'];trackBy:trackByValue\" [value]=\"item?.value\" (dblclick)=\"moveAvailableItemToSelected(item)\">{{item?.text}}</option> </select> </div> <div class=\"col-md-2 col-lg-2 col-sm-12 center-block text-center\"> <button type=\"button\" class=\"btn btn-default col-md-8 col-md-offset-2 atr top80 sm-spacing\" *ngIf=\"moveAllButton\" (click)=\"moveAllItemsToSelected()\"> <span class=\"{{iconClasses.moveAllToSelected.listIcon}}\"></span> <span class=\"{{iconClasses.moveAllToSelected.directionIcon}}\"></span> </button> <button type=\"button\" class=\"btn btn-default col-md-8 col-md-offset-2 str vertical-spacing-5 sm-spacing\" [disabled]=\"!availableListBoxControl.value?.length\" (click)=\"moveMarkedAvailableItemsToSelected()\"> <span class=\"{{moveSingleToSelected}}\"></span> </button> <button type=\"button\" class=\"btn btn-default col-md-8 col-md-offset-2 stl vertical-spacing-5 sm-spacing\" [disabled]=\"!selectedListBoxControl.value?.length\" (click)=\"moveMarkedSelectedItemsToAvailable()\"> <span class=\"{{moveSingleToAvailable}}\"></span> </button> <button type=\"button\" class=\"btn btn-default col-md-8 col-md-offset-2 atl bottom10 sm-spacing\" *ngIf=\"moveAllButton\" (click)=\"moveAllItemsToAvailable()\"> <span class=\"{{iconClasses.moveAllToAvailable.listIcon}}\"></span> <span class=\"{{iconClasses.moveAllToAvailable.directionIcon}}\"></span> </button> </div> <div class=\"col-md-5 col-lg-5 col-sm-12\"> <h4 class=\"text-center vertical-spacing-5\">{{selectedText}}</h4> <input type=\"text\" class=\"form-control vertical-spacing-5\" placeholder=\"{{selectedFilterPlaceholder}}\" formControlName=\"selectedSearchInput\" /> <select class=\"form-control list-box\" formControlName=\"selectedListBox\" multiple> <option *ngFor=\"let item of selectedItems | arrayFilter:['text', searchTermSelected] | arraySort:['text', 'ASC'];trackBy:trackByValue\" [value]=\"item?.value\" (dblclick)=\"moveSelectedItemToAvailable(item)\">{{item?.text}}</option> </select> </div> </div>",
                styles: [".list-box { min-height: 200px; width: 100%; } .top100 { margin-top: 100px; } .top80 { margin-top: 80px; } .bottom10 { margin-bottom: 10px; } .vertical-spacing-5 { margin-top: 5px; margin-bottom: 5px; } .center-block { min-height: 50px; } /* Small Devices, Tablets */ @media only screen and (max-width : 768px) { .sm-spacing { margin-top: 10px; margin-bottom: 10px; } } /* Tablets in portrait */ @media only screen and (min-width : 768px) and (max-width : 992px) { .sm-spacing { margin-top: 10px; margin-bottom: 10px; } } /* Extra Small Devices, Phones */  @media only screen and (max-width : 480px) { .sm-spacing { margin-top: 10px; margin-bottom: 10px; } }"],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DualListBoxComponent; }),
                        multi: true
                    }]
            },] },
];
/**
 * @nocollapse
 */
DualListBoxComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };
DualListBoxComponent.propDecorators = {
    'data': [{ type: Input },],
    'availableSearch': [{ type: Input },],
    'selectedSearch': [{ type: Input },],
    'valueField': [{ type: Input },],
    'textField': [{ type: Input },],
    'title': [{ type: Input },],
    'debounceTime': [{ type: Input },],
    'moveAllButton': [{ type: Input },],
    'availableText': [{ type: Input },],
    'selectedText': [{ type: Input },],
    'availableFilterPlaceholder': [{ type: Input },],
    'selectedFilterPlaceholder': [{ type: Input },],
    'icons': [{ type: Input },],
    'onAvailableItemSelected': [{ type: Output },],
    'onSelectedItemsSelected': [{ type: Output },],
    'onItemsMoved': [{ type: Output },],
};
function DualListBoxComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DualListBoxComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DualListBoxComponent.ctorParameters;
    /** @type {?} */
    DualListBoxComponent.propDecorators;
    /** @type {?} */
    DualListBoxComponent.prototype.valueField;
    /** @type {?} */
    DualListBoxComponent.prototype.textField;
    /** @type {?} */
    DualListBoxComponent.prototype.title;
    /** @type {?} */
    DualListBoxComponent.prototype.debounceTime;
    /** @type {?} */
    DualListBoxComponent.prototype.moveAllButton;
    /** @type {?} */
    DualListBoxComponent.prototype.availableText;
    /** @type {?} */
    DualListBoxComponent.prototype.selectedText;
    /** @type {?} */
    DualListBoxComponent.prototype.availableFilterPlaceholder;
    /** @type {?} */
    DualListBoxComponent.prototype.selectedFilterPlaceholder;
    /** @type {?} */
    DualListBoxComponent.prototype.onAvailableItemSelected;
    /** @type {?} */
    DualListBoxComponent.prototype.onSelectedItemsSelected;
    /** @type {?} */
    DualListBoxComponent.prototype.onItemsMoved;
    /** @type {?} */
    DualListBoxComponent.prototype.searchTermAvailable;
    /** @type {?} */
    DualListBoxComponent.prototype.searchTermSelected;
    /** @type {?} */
    DualListBoxComponent.prototype.availableItems;
    /** @type {?} */
    DualListBoxComponent.prototype.selectedItems;
    /** @type {?} */
    DualListBoxComponent.prototype.listBoxForm;
    /** @type {?} */
    DualListBoxComponent.prototype.availableListBoxControl;
    /** @type {?} */
    DualListBoxComponent.prototype.selectedListBoxControl;
    /** @type {?} */
    DualListBoxComponent.prototype.availableSearchInputControl;
    /** @type {?} */
    DualListBoxComponent.prototype.selectedSearchInputControl;
    /** @type {?} */
    DualListBoxComponent.prototype.iconClasses;
    /** @type {?} */
    DualListBoxComponent.prototype._onChange;
    /** @type {?} */
    DualListBoxComponent.prototype._onTouched;
    /** @type {?} */
    DualListBoxComponent.prototype.fb;
}
