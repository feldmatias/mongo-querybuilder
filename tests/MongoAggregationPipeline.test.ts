import {Equals, Exists, MongoAggregationPipeline, SortDirection} from '../src';

describe('Aggregation Pipeline', () => {
    describe('match', () => {
        test('match aggregation', () => {
            const pipeline = new MongoAggregationPipeline().match(
                Exists('test_field')
            );

            const expected = [{$match: {test_field: {$exists: true}}}];

            expect(pipeline.toMongo()).toEqual(expected);
        });
    });

    describe('sort', () => {
        test('sort aggregation', () => {
            const pipeline = new MongoAggregationPipeline().sort(
                'test_field',
                SortDirection.ASC
            );

            const expected = [{$sort: {test_field: 1}}];

            expect(pipeline.toMongo()).toEqual(expected);
        });
    });

    test('multiple aggregations together', () => {
        const pipeline = new MongoAggregationPipeline()
            .match(Exists('test_field1'))
            .sort('test_field2', SortDirection.ASC)
            .match(Equals('test_field3', 5));

        const expected = [
            {$match: {test_field1: {$exists: true}}},
            {$sort: {test_field2: 1}},
            {$match: {test_field3: 5}},
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
