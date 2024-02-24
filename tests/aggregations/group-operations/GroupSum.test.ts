import {Sum} from '../../../src';

describe('Group Sum', () => {
    test('returns mongo sum query', () => {
        const query = Sum('test_field');

        const expected = {$sum: '$test_field'};

        expect(query.toMongo()).toEqual(expected);
    });
});
