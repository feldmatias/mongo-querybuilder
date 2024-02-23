import {Exists, MongoAggregationPipeline} from '../src';

describe('Aggregation Pipeline', () => {
    test('match aggregation', () => {
        const pipeline = new MongoAggregationPipeline().match(
            Exists('test_field')
        );

        const expected = [{$match: {test_field: {$exists: true}}}];

        expect(pipeline.toMongo()).toEqual(expected);
    });

    test('multiple aggregations together', () => {
        const pipeline = new MongoAggregationPipeline().match(
            Exists('test_field')
        );

        const expected = [{$match: {test_field: {$exists: true}}}];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
