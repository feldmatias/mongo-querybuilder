import {Limit} from '../../src';

describe('Limit', () => {
    test('returns mongo limit query', () => {
        const query = Limit(123);

        const expected = {$limit: 123};

        expect(query.toMongo()).toEqual(expected);
    });
});
