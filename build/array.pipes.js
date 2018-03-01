import { Pipe } from '@angular/core';
import * as _ from 'lodash/index';
/**
 * Utility class to not hardcode sort directions
 */
var SortOptions = (function () {
    function SortOptions() {
    }
    return SortOptions;
}());
export { SortOptions };
/**
 * Static property to defined ASC and DESC values
to avoid hardcoding and repeating
replaces string enums
\@type {{ASC: string; DESC: string}}
 */
SortOptions.direction = {
    ASC: 'ASC',
    DESC: 'DESC'
};
function SortOptions_tsickle_Closure_declarations() {
    /**
     * Static property to defined ASC and DESC values
    to avoid hardcoding and repeating
    replaces string enums
    \@type {{ASC: string; DESC: string}}
     * @type {?}
     */
    SortOptions.direction;
}
/**
 * Pipe used to sort arrays by using lodash
Takes array and array of 2 strings(parameters), key and direction
direction must be either ASC or DESC
 */
var ArraySortPipe = (function () {
    function ArraySortPipe() {
    }
    /**
     * @param {?} array
     * @param {?} args
     * @return {?}
     */
    ArraySortPipe.prototype.transform = function (array, args) {
        array = array || [];
        if (typeof args === 'undefined' || args.length !== 2) {
            return array;
        }
        var key = args[0], direction = args[1];
        if (direction !== SortOptions.direction.ASC && direction !== SortOptions.direction.DESC) {
            return array;
        }
        // if there is no key we assume item is of string type
        return _.orderBy(array, function (item) { return item.hasOwnProperty(key) ? item[key] : item; }, direction.toLowerCase());
    };
    return ArraySortPipe;
}());
export { ArraySortPipe };
ArraySortPipe.decorators = [
    { type: Pipe, args: [{
                name: 'arraySort'
            },] },
];
/**
 * @nocollapse
 */
ArraySortPipe.ctorParameters = function () { return []; };
function ArraySortPipe_tsickle_Closure_declarations() {
    /** @type {?} */
    ArraySortPipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ArraySortPipe.ctorParameters;
}
/**
 * Pipe used to filter array, takes input array and
array of 2 arguments, key of object and search term
if key does not exist, pipe assumes the item is string
 */
var ArrayFilterPipe = (function () {
    function ArrayFilterPipe() {
    }
    /**
     * @param {?} array
     * @param {?} args
     * @return {?}
     */
    ArrayFilterPipe.prototype.transform = function (array, args) {
        array = array || [];
        if (typeof args === 'undefined' || args.length !== 2) {
            return array;
        }
        var key = args[0], searchTerm = args[1];
        if (searchTerm.trim() === '') {
            return array;
        }
        return array.filter(function (item) { return item[key].toString().toLowerCase().search(searchTerm.toLowerCase().trim()) >= 0; });
    };
    return ArrayFilterPipe;
}());
export { ArrayFilterPipe };
ArrayFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'arrayFilter'
            },] },
];
/**
 * @nocollapse
 */
ArrayFilterPipe.ctorParameters = function () { return []; };
function ArrayFilterPipe_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayFilterPipe.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ArrayFilterPipe.ctorParameters;
}
