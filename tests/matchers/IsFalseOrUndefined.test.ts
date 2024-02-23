import {IsFalseOrUndefined, Equals} from '../../src';

describe('IsFalse', () => {
    test('field is false or undefined', () => {
        const query = IsFalseOrUndefined('test_field');

        const expected = {
            $or: [{test_field: false}, {test_field: {$exists: false}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = IsFalseOrUndefined('a').and(IsFalseOrUndefined('b'));

        const expected = {
            $and: [
                {$or: [{a: false}, {a: {$exists: false}}]},
                {$or: [{b: false}, {b: {$exists: false}}]},
            ],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = IsFalseOrUndefined('a').or(IsFalseOrUndefined('b'));

        const expected = {
            $or: [
                {$or: [{a: false}, {a: {$exists: false}}]},
                {$or: [{b: false}, {b: {$exists: false}}]},
            ],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
