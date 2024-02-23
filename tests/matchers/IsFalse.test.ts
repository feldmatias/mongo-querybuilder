import {IsFalse} from '../../src';

describe('IsFalse', () => {
    test('field is false', () => {
        const query = IsFalse('test_field');

        const expected = {
            test_field: false,
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = IsFalse('a').and(IsFalse('b'));

        const expected = {
            $and: [{a: false}, {b: false}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = IsFalse('a').or(IsFalse('b'));

        const expected = {
            $or: [{a: false}, {b: false}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
