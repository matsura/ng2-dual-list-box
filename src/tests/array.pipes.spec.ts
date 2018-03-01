import { TestBed, inject } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

import { ArrayFilterPipe, ArraySortPipe, SortOptions } from '../array.pipes';

describe('Array filter pipe ', (): void => {

    let testArray: Array<{ key: string, value: number }> = [{ key: 'Eldar', value: 10 }, { key: 'Sarajevo', value: 200 }];

    beforeEach((done: Function): void => {
        TestBed.configureTestingModule({
            declarations: [
                ArrayFilterPipe
            ],
            imports: [
                CommonModule
            ],
            providers: [
                ArrayFilterPipe
            ]
        });

        done();
    });

    it('should return empty array if undefined is passed',
        inject([ArrayFilterPipe], (pipe: ArrayFilterPipe): void => {

        expect(pipe.transform(undefined, ['key', 'Eldar'])).toEqual([]);
    }));

    it('should return empty array if array of length 0 is passed',
        inject([ArrayFilterPipe], (pipe: ArrayFilterPipe): void => {

        expect(pipe.transform([], ['key', 'value'])).toEqual([]);
    }));

    it('should return original array if less or more than 2 arguments are passed',
        inject([ArrayFilterPipe], (pipe: ArrayFilterPipe): void => {

        expect(_.isEqual(testArray, pipe.transform(testArray, []))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key']))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value', 'value'] ))).toBe(true);
    }));

    it('should return original array if search term consisting of only spaces is passed',
        inject([ArrayFilterPipe], (pipe: ArrayFilterPipe): void => {

        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', '       ']))).toBe(true);
    }));

    it('should filter array based on passed key and search term and return array containing filtered values',
        inject([ArrayFilterPipe], (pipe: ArrayFilterPipe): void => {

        const filteredArray: Array<{}> = pipe.transform(testArray, ['key', 'Eldar']);
        expect(filteredArray.length).toEqual(1);
        expect((filteredArray[0] as { key: string, value: number }).key).toEqual('Eldar');
    }));

});

describe('Array sort pipe ', (): void => {

    let testArray: Array<{ key: string, value: number }> = [{ key: 'Sarajevo', value: 10 },
        { key: 'Eldar', value: 200 }];

    beforeEach((done: Function): void => {
        TestBed.configureTestingModule({
            declarations: [
                ArraySortPipe
            ],
            imports: [
                CommonModule
            ],
            providers: [
                ArraySortPipe
            ]
        });

        done();
    });

    it('should return empty array if undefined is passed',
        inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        expect(pipe.transform(undefined, ['key', 'Eldar'])).toEqual([]);
    }));

    it('should return empty array if array of length 0 is passed',
        inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        expect(pipe.transform([], ['key', 'value'])).toEqual([]);
    }));

    it('should return original array if undefined is passed as arguments',
        inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        expect(_.isEqual(testArray, pipe.transform(testArray, undefined))).toBe(true);
    }));

    it('should return original array if less or more than 2 arguments are passed', inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        expect(_.isEqual(testArray, pipe.transform(testArray, []))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key']))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value', 'value']))).toBe(true);
    }));

    it('should sort an array in ascending order by key and ASC direction passed', inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        const sortedArray: Array<{}> = pipe.transform(testArray, ['key', SortOptions.direction.ASC]);
        expect(sortedArray.length).toEqual(2);
        expect((sortedArray[0] as { key: string, value: number }).key).toEqual('Eldar');
        expect((sortedArray[1] as { key: string, value: number }).key).toEqual('Sarajevo');
    }));

    it('should sort an array in descending order by key and DESC direction passed', inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        const sortedArray: Array<{}> = pipe.transform(testArray, ['key', SortOptions.direction.DESC]);
        expect(sortedArray.length).toEqual(2);
        expect((sortedArray[0] as { key: string, value: number }).key).toEqual('Sarajevo');
        expect((sortedArray[1] as { key: string, value: number }).key).toEqual('Eldar');
    }));

    it('should return original array if invalid direction is passed', inject([ArraySortPipe], (pipe: ArraySortPipe): void => {

        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value'] ))).toBe(true);
    }));

});
