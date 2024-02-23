import {And, Equals} from '../../src';

describe('And', () => {
    test('and 1 matcher', () => {
        const query = And(Equals('a', 1));

        const expected = {
            $and: [{a: 1}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and 2 matchers', () => {
        const query = And(Equals('a', 1), Equals('b', 2));

        const expected = {
            $and: [{a: 1}, {b: 2}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and 3 matchers', () => {
        const query = And(Equals('a', 1), Equals('b', 2), Equals('c', 3));

        const expected = {
            $and: [{a: 1}, {b: 2}, {c: 3}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and inside and', () => {
        const query = And(
            Equals('test', 'test'),
            Equals('a', 1).and(Equals('b', 2))
        );

        const expected = {
            $and: [{test: 'test'}, {$and: [{a: 1}, {b: 2}]}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or inside and', () => {
        const query = And(
            Equals('test', 'test'),
            Equals('a', 1).or(Equals('b', 2))
        );

        const expected = {
            $and: [{test: 'test'}, {$or: [{a: 1}, {b: 2}]}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
