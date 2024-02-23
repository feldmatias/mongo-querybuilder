import {Match, Exists, IsTrue, Equals} from '../../src';

describe('Match', () => {
    test('simple match query', () => {
        const query = Exists('test_field');
        const match = Match(query);

        const expected = {$match: {test_field: {$exists: true}}};

        expect(match.toMongo()).toEqual(expected);
    });

    test('complex match query', () => {
        const query = IsTrue('a').or(Exists('b')).and(Equals('c', 5));
        const match = Match(query);

        const expected = {
            $match: {$and: [{$or: [{a: true}, {b: {$exists: true}}]}, {c: 5}]},
        };

        expect(match.toMongo()).toEqual(expected);
    });
});
