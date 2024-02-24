import {StringConcat} from '../../src';

describe('String Concat', () => {
    test('concat one field', () => {
        const query = StringConcat().concatField('test_field');

        const expected = {$concat: ['$test_field']};

        expect(query.toMongo()).toEqual(expected);
    });

    test('concat multiple fields', () => {
        const query = StringConcat()
            .concatField('test_field1')
            .concatField('test_field2');

        const expected = {$concat: ['$test_field1', '$test_field2']};

        expect(query.toMongo()).toEqual(expected);
    });

    test('concat one field with one string', () => {
        const query = StringConcat()
            .concatField('test_field')
            .concatString('test_string');

        const expected = {$concat: ['$test_field', 'test_string']};

        expect(query.toMongo()).toEqual(expected);
    });

    test('concat multiple fields with multiple strings', () => {
        const query = StringConcat()
            .concatField('test_field1')
            .concatString('test_string1')
            .concatField('test_field2')
            .concatString('test_string2');

        const expected = {
            $concat: [
                '$test_field1',
                'test_string1',
                '$test_field2',
                'test_string2',
            ],
        };

        expect(query.toMongo()).toEqual(expected);
    });
});
