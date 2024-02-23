import {Sort, SortDirection} from '../../src';

describe('Sort', () => {
    test('sort asc', () => {
        const sort = Sort('test_field', SortDirection.ASC);

        const expected = {$sort: {test_field: 1}};

        expect(sort.toMongo()).toEqual(expected);
    });

    test('sort desc', () => {
        const sort = Sort('test_field', SortDirection.DESC);

        const expected = {$sort: {test_field: -1}};

        expect(sort.toMongo()).toEqual(expected);
    });

    test('sort 2 fields', () => {
        const sort = Sort('test_field1', SortDirection.ASC).andSort(
            'test_field2',
            SortDirection.DESC
        );

        const expected = {$sort: {test_field1: 1, test_field2: -1}};

        expect(sort.toMongo()).toEqual(expected);
    });

    test('sort 3 fields', () => {
        const sort = Sort('test_field1', SortDirection.ASC)
            .andSort('test_field2', SortDirection.DESC)
            .andSort('test_field3', SortDirection.ASC);

        const expected = {
            $sort: {test_field1: 1, test_field2: -1, test_field3: 1},
        };

        expect(sort.toMongo()).toEqual(expected);
    });
});
