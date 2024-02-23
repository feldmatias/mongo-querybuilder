import {NotExists} from '../../src';

describe('NotExists', () => {
    test('field not exists', () => {
        const query = NotExists('test_field');

        const expected = {
            test_field: {$exists: false},
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('and', () => {
        const query = NotExists('a').and(NotExists('b'));

        const expected = {
            $and: [{a: {$exists: false}}, {b: {$exists: false}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });

    test('or', () => {
        const query = NotExists('a').or(NotExists('b'));

        const expected = {
            $or: [{a: {$exists: false}}, {b: {$exists: false}}],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
