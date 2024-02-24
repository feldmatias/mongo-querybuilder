import {
    IMongoQuery,
    LimitOffsetPagination,
    MongoLimitOffsetPagination,
} from '../../src';

describe('Limit Offset Pagination', () => {
    const toMongo = (pagination: MongoLimitOffsetPagination): IMongoQuery[] => {
        return pagination.toAggregation().map(agg => agg.toMongo());
    };

    test('first page', () => {
        const pagination = LimitOffsetPagination({pageSize: 10});

        const expected = [{$limit: 10}];

        expect(toMongo(pagination)).toEqual(expected);
    });

    test('second page', () => {
        const pagination = LimitOffsetPagination({pageSize: 10, page: 1});

        const expected = [{$skip: 10}, {$limit: 10}];

        expect(toMongo(pagination)).toEqual(expected);
    });

    test('third page', () => {
        const pagination = LimitOffsetPagination({pageSize: 10, page: 2});

        const expected = [{$skip: 20}, {$limit: 10}];

        expect(toMongo(pagination)).toEqual(expected);
    });

    test('next page after first page', () => {
        const pagination = LimitOffsetPagination({pageSize: 20}).nextPage();

        const expected = [{$skip: 20}, {$limit: 20}];

        expect(toMongo(pagination)).toEqual(expected);
    });

    test('next page after second page', () => {
        const pagination = LimitOffsetPagination({
            pageSize: 20,
            page: 1,
        }).nextPage();

        const expected = [{$skip: 40}, {$limit: 20}];

        expect(toMongo(pagination)).toEqual(expected);
    });
});
