"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var _ = require("lodash");
var array_pipes_1 = require("../array.pipes");
describe('Array filter pipe ', function () {
    var testArray = [{ key: 'Eldar', value: 10 }, { key: 'Sarajevo', value: 200 }];
    beforeEach(function (done) {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                array_pipes_1.ArrayFilterPipe
            ],
            imports: [
                common_1.CommonModule
            ],
            providers: [
                array_pipes_1.ArrayFilterPipe
            ]
        });
        done();
    });
    it('should return empty array if undefined is passed', testing_1.inject([array_pipes_1.ArrayFilterPipe], function (pipe) {
        expect(pipe.transform(undefined, ['key', 'Eldar'])).toEqual([]);
    }));
    it('should return empty array if array of length 0 is passed', testing_1.inject([array_pipes_1.ArrayFilterPipe], function (pipe) {
        expect(pipe.transform([], ['key', 'value'])).toEqual([]);
    }));
    it('should return original array if less or more than 2 arguments are passed', testing_1.inject([array_pipes_1.ArrayFilterPipe], function (pipe) {
        expect(_.isEqual(testArray, pipe.transform(testArray, []))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key']))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value', 'value']))).toBe(true);
    }));
    it('should return original array if search term consisting of only spaces is passed', testing_1.inject([array_pipes_1.ArrayFilterPipe], function (pipe) {
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', '       ']))).toBe(true);
    }));
    it('should filter array based on passed key and search term and return array containing filtered values', testing_1.inject([array_pipes_1.ArrayFilterPipe], function (pipe) {
        var filteredArray = pipe.transform(testArray, ['key', 'Eldar']);
        expect(filteredArray.length).toEqual(1);
        expect(filteredArray[0].key).toEqual('Eldar');
    }));
});
describe('Array sort pipe ', function () {
    var testArray = [{ key: 'Sarajevo', value: 10 }, { key: 'Eldar', value: 200 }];
    beforeEach(function (done) {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                array_pipes_1.ArraySortPipe
            ],
            imports: [
                common_1.CommonModule
            ],
            providers: [
                array_pipes_1.ArraySortPipe
            ]
        });
        done();
    });
    it('should return empty array if undefined is passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        expect(pipe.transform(undefined, ['key', 'Eldar'])).toEqual([]);
    }));
    it('should return empty array if array of length 0 is passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        expect(pipe.transform([], ['key', 'value'])).toEqual([]);
    }));
    it('should return original array if undefined is passed as arguments', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        expect(_.isEqual(testArray, pipe.transform(testArray, undefined))).toBe(true);
    }));
    it('should return original array if less or more than 2 arguments are passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        expect(_.isEqual(testArray, pipe.transform(testArray, []))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key']))).toBe(true);
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value', 'value']))).toBe(true);
    }));
    it('should sort an array in ascending order by key and ASC direction passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        var sortedArray = pipe.transform(testArray, ['key', array_pipes_1.SortOptions.direction.ASC]);
        expect(sortedArray.length).toEqual(2);
        expect(sortedArray[0].key).toEqual('Eldar');
        expect(sortedArray[1].key).toEqual('Sarajevo');
    }));
    it('should sort an array in descending order by key and DESC direction passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        var sortedArray = pipe.transform(testArray, ['key', array_pipes_1.SortOptions.direction.DESC]);
        expect(sortedArray.length).toEqual(2);
        expect(sortedArray[0].key).toEqual('Sarajevo');
        expect(sortedArray[1].key).toEqual('Eldar');
    }));
    it('should return original array if invalid direction is passed', testing_1.inject([array_pipes_1.ArraySortPipe], function (pipe) {
        expect(_.isEqual(testArray, pipe.transform(testArray, ['key', 'value']))).toBe(true);
    }));
});
