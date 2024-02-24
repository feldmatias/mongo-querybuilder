import {Count, GroupBy, Sum} from '../../src';

describe('Group By', () => {
    test('group by one field', () => {
        const group = GroupBy('test_field');

        const expected = {
            $group: {
                _id: '$test_field',
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('group by multiple fields', () => {
        const group = GroupBy('test_field1', 'test_field2');

        const expected = {
            $group: {
                _id: {
                    test_field1: '$test_field1',
                    test_field2: '$test_field2',
                },
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('group by with one field and one operation', () => {
        const group = GroupBy('test_field').aggregate(
            'sum_result',
            Sum('test_field')
        );

        const expected = {
            $group: {
                _id: '$test_field',
                sum_result: {$sum: '$test_field'},
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('group by with multiple fields and multiple operations', () => {
        const group = GroupBy('test_field1', 'test_field2')
            .aggregate('sum_result', Sum('test_field1'))
            .aggregate('count_result', Count());

        const expected = {
            $group: {
                _id: {
                    test_field1: '$test_field1',
                    test_field2: '$test_field2',
                },
                sum_result: {$sum: '$test_field1'},
                count_result: {$sum: 1},
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('group by with one field and multiple operations', () => {
        const group = GroupBy('test_field')
            .aggregate('sum_result', Sum('test_field'))
            .aggregate('count_result', Count());

        const expected = {
            $group: {
                _id: '$test_field',
                sum_result: {$sum: '$test_field'},
                count_result: {$sum: 1},
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('and group by when no operations', () => {
        const group = GroupBy('test_field1').andGroupBy('test_field2');

        const expected = {
            $group: {
                _id: {
                    test_field1: '$test_field1',
                    test_field2: '$test_field2',
                },
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });

    test('and group by when operations', () => {
        const group = GroupBy('test_field1')
            .aggregate('sum_result', Sum('test_field1'))
            .andGroupBy('test_field2')
            .aggregate('count_result', Count());

        const expected = {
            $group: {
                _id: {
                    test_field1: '$test_field1',
                    test_field2: '$test_field2',
                },
                sum_result: {$sum: '$test_field1'},
                count_result: {$sum: 1},
            },
        };

        expect(group.toMongo()).toEqual(expected);
    });
});
