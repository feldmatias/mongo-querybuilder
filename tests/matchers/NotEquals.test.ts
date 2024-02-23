import {NotEquals} from '../../src';

describe('NotEquals', () => {
    test('not equals string', () => {
        const query = NotEquals('test_field', 'test_value');

        const expected = {
            test_field: {
                $ne: 'test_value',
            },
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('not equals number', () => {
        const query = NotEquals('test_field', 123);

        const expected = {
            test_field: {
                $ne: 123,
            },
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('not equals boolean', () => {
        const query = NotEquals('test_field', true);

        const expected = {
            test_field: {
                $ne: true,
            },
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('not equals date', () => {
        const date = new Date('2021-01-01');
        const query = NotEquals('test_field', date);

        const expected = {
            test_field: {
                $ne: date,
            },
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = NotEquals('a', 1).and(NotEquals('b', 2));

        const expected = {
            $and: [{a: {$ne: 1}}, {b: {$ne: 2}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = NotEquals('a', 1).or(NotEquals('b', 2));

        const expected = {
            $or: [{a: {$ne: 1}}, {b: {$ne: 2}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
