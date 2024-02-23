import {IsTrue} from '../../src';

describe('IsTrue', () => {
    test('field is true', () => {
        const query = IsTrue('test_field');

        const expected = {
            test_field: true,
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = IsTrue('a').and(IsTrue('b'));

        const expected = {
            $and: [{a: true}, {b: true}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = IsTrue('a').or(IsTrue('b'));

        const expected = {
            $or: [{a: true}, {b: true}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
