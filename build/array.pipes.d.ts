import { PipeTransform } from '@angular/core';
/**
 * Utility class to not hardcode sort directions
 */
export declare class SortOptions {
    /**
     * Static property to defined ASC and DESC values
     * to avoid hardcoding and repeating
     * replaces string enums
     * @type {{ASC: string; DESC: string}}
     */
    static direction: {
        ASC: string;
        DESC: string;
    };
}
/**
 * Pipe used to sort arrays by using lodash
 * Takes array and array of 2 strings(parameters), key and direction
 * direction must be either ASC or DESC
 */
export declare class ArraySortPipe implements PipeTransform {
    transform(array: Array<{}>, args: string[]): Array<string> | Array<{}>;
}
/**
 * Pipe used to filter array, takes input array and
 * array of 2 arguments, key of object and search term
 * if key does not exist, pipe assumes the item is string
 */
export declare class ArrayFilterPipe implements PipeTransform {
    transform(array: Array<{}>, args: string[]): Array<string> | Array<{}>;
}
