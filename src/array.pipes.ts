import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

export class SortOptions {
    static direction: {
        ASC: string,
        DESC: string
    } = {
        ASC: 'ASC',
        DESC: 'DESC'
    };
}

@Pipe({
    name: 'arraySort'
})
export class ArraySortPipe implements PipeTransform {

    transform(array: Array<{}>, args: string[]): Array<string> | Array<{}> {

        array = array || [];

        if (typeof args === 'undefined') {
            return array;
        }

        const [key, direction] = args;

        if (direction !== SortOptions.direction.ASC && direction !== SortOptions.direction.DESC) {
            return array;
        }

        // if there is no key we assume item is of string type
        return _.orderBy(array, (item: {} | string) => item.hasOwnProperty(key) ? item[key] : item, direction);
    }
}