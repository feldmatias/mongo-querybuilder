import {Equals, Exists, IsTrue, Match} from '../../src';

describe('Match', () => {
    test('simple match query', () => {
        const query = Exists('test_field');
        const match = Match(query);

        const expected = {$match: {test_field: {$exists: true}}};

        expect(match.toMongo()).toEqual(expected);
    });

    test('and match', () => {
        const query1 = Exists('test_field1');
        const query2 = Exists('test_field2').or(Exists('test_field3'));

        const match = Match(query1).andMatch(query2);

        const expected = {
            $match: {
                $and: [
                    {test_field1: {$exists: true}},
                    {
                        $or: [
                            {test_field2: {$exists: true}},
                            {test_field3: {$exists: true}},
                        ],
                    },
                ],
            },
        };

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
