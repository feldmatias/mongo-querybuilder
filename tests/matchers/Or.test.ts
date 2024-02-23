import {Equals, Or} from '../../src';

describe('Or', () => {
    test('or 1 matcher', () => {
        const query = Or(Equals('a', 1));

        const expected = {
            $or: [{a: 1}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or 2 matchers', () => {
        const query = Or(Equals('a', 1), Equals('b', 2));

        const expected = {
            $or: [{a: 1}, {b: 2}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or 3 matchers', () => {
        const query = Or(Equals('a', 1), Equals('b', 2), Equals('c', 3));

        const expected = {
            $or: [{a: 1}, {b: 2}, {c: 3}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or inside or', () => {
        const query = Or(
            Equals('test', 'test'),
            Equals('a', 1).or(Equals('b', 2))
        );

        const expected = {
            $or: [{test: 'test'}, {$or: [{a: 1}, {b: 2}]}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and inside or', () => {
        const query = Or(
            Equals('test', 'test'),
            Equals('a', 1).and(Equals('b', 2))
        );

        const expected = {
            $or: [{test: 'test'}, {$and: [{a: 1}, {b: 2}]}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
