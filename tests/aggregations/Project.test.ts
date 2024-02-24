import {Project, StringConcat} from '../../src';

describe('Project', () => {
    test('project one field', () => {
        const project = Project('test_field');

        const expected = {$project: {test_field: 1}};

        expect(project.toMongo()).toEqual(expected);
    });

    test('project multiple fields', () => {
        const project = Project('test_field1').andProject('test_field2');

        const expected = {$project: {test_field1: 1, test_field2: 1}};

        expect(project.toMongo()).toEqual(expected);
    });

    test('project one field with projection', () => {
        const project = Project(
            'test_field',
            StringConcat().concatField('weight').concatString('kg')
        );

        const expected = {$project: {test_field: {$concat: ['$weight', 'kg']}}};

        expect(project.toMongo()).toEqual(expected);
    });

    test('project multiple fields with projections', () => {
        const project = Project('test_field1').andProject(
            'test_field2',
            StringConcat().concatField('height').concatString('cm')
        );

        const expected = {
            $project: {
                test_field1: 1,
                test_field2: {$concat: ['$height', 'cm']},
            },
        };

        expect(project.toMongo()).toEqual(expected);
    });
});
