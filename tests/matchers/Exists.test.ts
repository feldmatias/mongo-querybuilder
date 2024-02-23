import {Exists} from '../../src';

describe('Exists', () => {
    test('field exists', () => {
        const query = Exists('test_field');

        const expected = {
            test_field: {$exists: true},
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = Exists('a').and(Exists('b'));

        const expected = {
            $and: [{a: {$exists: true}}, {b: {$exists: true}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = Exists('a').or(Exists('b'));

        const expected = {
            $or: [{a: {$exists: true}}, {b: {$exists: true}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
