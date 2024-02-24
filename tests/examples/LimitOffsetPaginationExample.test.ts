/* Schema
type Item = {
    name: string;
    stock: number;
};
*/

import {
    LimitOffsetPagination,
    MongoAggregationPipeline,
    StringConcat,
} from '../../src';

describe('Limit Offset Pagination Example', () => {
    test('get first page', () => {
        const pipeline = new MongoAggregationPipeline().paginate(
            LimitOffsetPagination({pageSize: 10})
        );

        const expected = [{$limit: 10}];

        expect(pipeline.toMongo()).toEqual(expected);
    });

    test('get second page', () => {
        const pipeline = new MongoAggregationPipeline().paginate(
            LimitOffsetPagination({pageSize: 10, page: 1})
        );

        const expected = [{$skip: 10}, {$limit: 10}];

        expect(pipeline.toMongo()).toEqual(expected);
    });

    test('paginate with projection', () => {
        const pipeline = new MongoAggregationPipeline()
            .paginate(LimitOffsetPagination({pageSize: 10, page: 1}))
            .project('name')
            .project(
                'stock',
                StringConcat().concatField('stock').concatString(' units')
            );

        const expected = [
            {$skip: 10},
            {$limit: 10},
            {$project: {name: 1, stock: {$concat: ['$stock', ' units']}}},
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
