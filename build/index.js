import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DualListBoxComponent } from './dual-list-box.component';
import { ArraySortPipe, ArrayFilterPipe } from './array.pipes';
export { DualListBoxComponent } from './dual-list-box.component';
var DualListBoxModule = (function () {
    function DualListBoxModule() {
    }
    /**
     * @return {?}
     */
    DualListBoxModule.forRoot = function () {
        return {
            ngModule: DualListBoxModule
        };
    };
    return DualListBoxModule;
}());
export { DualListBoxModule };
DualListBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule
                ],
                declarations: [
                    ArraySortPipe,
                    ArrayFilterPipe,
                    DualListBoxComponent
                ],
                exports: [
                    DualListBoxComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
DualListBoxModule.ctorParameters = function () { return []; };
function DualListBoxModule_tsickle_Closure_declarations() {
    /** @type {?} */
    DualListBoxModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DualListBoxModule.ctorParameters;
}
