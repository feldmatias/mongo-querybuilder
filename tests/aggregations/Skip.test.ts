import {Skip} from '../../src';

describe('Skip', () => {
    test('returns mongo skip query', () => {
        const query = Skip(123);

        const expected = {$skip: 123};

        expect(query.toMongo()).toEqual(expected);
    });
});
