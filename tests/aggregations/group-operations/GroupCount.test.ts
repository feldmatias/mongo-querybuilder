import {Count} from '../../../src';

describe('Group Count', () => {
    test('returns mongo count query', () => {
        const query = Count();

        const expected = {$sum: 1};

        expect(query.toMongo()).toEqual(expected);
    });
});
