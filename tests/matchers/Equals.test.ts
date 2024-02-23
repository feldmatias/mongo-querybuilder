import {Equals} from '../../src';

describe('Equals', () => {
    test('string equals', () => {
        const query = Equals('test_field', 'test_value');

        const expected = {
            test_field: 'test_value',
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('number equals', () => {
        const query = Equals('test_field', 1);

        const expected = {
            test_field: 1,
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('boolean equals', () => {
        const query = Equals('test_field', true);

        const expected = {
            test_field: true,
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('date equals', () => {
        const date = new Date();
        const query = Equals('test_field', date);

        const expected = {
            test_field: date,
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = Equals('a', 1).and(Equals('b', 2));

        const expected = {
            $and: [{a: 1}, {b: 2}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = Equals('a', 1).or(Equals('b', 2));

        const expected = {
            $or: [{a: 1}, {b: 2}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
