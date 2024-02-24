import {Avg} from '../../../src';

describe('Group Avg', () => {
    test('returns mongo avg query', () => {
        const query = Avg('test_field');

        const expected = {$avg: '$test_field'};

        expect(query.toMongo()).toEqual(expected);
    });
});
