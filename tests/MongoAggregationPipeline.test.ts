import {
    Count,
    Equals,
    Exists,
    GroupBy,
    MongoAggregationPipeline,
    SortDirection,
} from '../src';

describe('Aggregation Pipeline', () => {
    describe('match', () => {
        test('match aggregation', () => {
            const pipeline = new MongoAggregationPipeline().match(
                Exists('test_field')
            );

            const expected = [{$match: {test_field: {$exists: true}}}];

            expect(pipeline.toMongo()).toEqual(expected);
        });

        test('two match aggregations', () => {
            const pipeline = new MongoAggregationPipeline()
                .match(Exists('test_field1'))
                .match(Equals('test_field2', 5));

            const expected = [
                {
                    $match: {
                        $and: [
                            {test_field1: {$exists: true}},
                            {test_field2: 5},
                        ],
                    },
                },
            ];

            expect(pipeline.toMongo()).toEqual(expected);
        });

        test('multiple match aggregations', () => {
            const pipeline = new MongoAggregationPipeline()
                .match(Exists('test_field1'))
                .match(Equals('test_field2', 5))
                .match(Exists('test_field3').or(Exists('test_field4')));

            const expected = [
                {
                    $match: {
                        $and: [
                            {test_field1: {$exists: true}},
                            {test_field2: 5},
                            {
                                $or: [
                                    {test_field3: {$exists: true}},
                                    {test_field4: {$exists: true}},
                                ],
                            },
                        ],
                    },
                },
            ];

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

        test('two sort aggregations', () => {
            const pipeline = new MongoAggregationPipeline()
                .sort('test_field1', SortDirection.ASC)
                .sort('test_field2', SortDirection.DESC);

            const expected = [{$sort: {test_field1: 1, test_field2: -1}}];

            expect(pipeline.toMongo()).toEqual(expected);
        });

        test('multiple sort aggregations', () => {
            const pipeline = new MongoAggregationPipeline()
                .sort('test_field1', SortDirection.ASC)
                .sort('test_field2', SortDirection.DESC)
                .sort('test_field3', SortDirection.ASC);

            const expected = [
                {$sort: {test_field1: 1, test_field2: -1, test_field3: 1}},
            ];

            expect(pipeline.toMongo()).toEqual(expected);
        });
    });

    describe('group', () => {
        test('group aggregation', () => {
            const pipeline = new MongoAggregationPipeline().group(
                GroupBy('test_field')
            );

            const expected = [
                {
                    $group: {
                        _id: '$test_field',
                    },
                },
            ];

            expect(pipeline.toMongo()).toEqual(expected);
        });

        test('multiple group aggregations', () => {
            const pipeline = new MongoAggregationPipeline()
                .group(GroupBy('test_field1'))
                .group(GroupBy('test_field2'));

            const expected = [
                {
                    $group: {
                        _id: '$test_field1',
                    },
                },
                {
                    $group: {
                        _id: '$test_field2',
                    },
                },
            ];

            expect(pipeline.toMongo()).toEqual(expected);
        });
    });

    test('multiple aggregations together', () => {
        const pipeline = new MongoAggregationPipeline()
            .match(Exists('test_field1'))
            .sort('test_field2', SortDirection.ASC)
            .match(Equals('test_field3', 5))
            .group(GroupBy('test_field4').aggregate('count', Count()));

        const expected = [
            {$match: {test_field1: {$exists: true}}},
            {$sort: {test_field2: 1}},
            {$match: {test_field3: 5}},
            {
                $group: {
                    _id: '$test_field4',
                    count: {$sum: 1},
                },
            },
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
