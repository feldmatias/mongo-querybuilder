/* Schema
type Item = {
    user: string;
    name: string;
    stock: number;
    valid: boolean;
    reserved: boolean | undefined;
};
*/

import {
    Equals,
    IsFalseOrUndefined,
    IsTrue,
    MongoAggregationPipeline,
    MongoMatcher,
    SortDirection,
} from '../../src';

function ItemIsAvailable(): MongoMatcher {
    // An item is available if it is valid, not reserved and its stock is greater than 0
    return IsTrue('valid')
        .and(IsFalseOrUndefined('reserved'))
        .and(Equals('stock', 0));
}

class ItemAggregationPipeline extends MongoAggregationPipeline {
    forUser(userId: string): this {
        return this.match(Equals('user', userId));
    }

    available(): this {
        return this.match(ItemIsAvailable());
    }

    sortByStock(): this {
        return this.sort('stock', SortDirection.DESC);
    }

    sortByName(direction: SortDirection): this {
        return this.sort('name', direction);
    }
}

describe('Business Example', () => {
    test('get available items for specific user, sorted by stock and name', () => {
        const pipeline = new ItemAggregationPipeline()
            .forUser('user1')
            .available()
            .sortByStock()
            .sortByName(SortDirection.ASC);

        const expected = [
            {
                $match: {
                    $and: [
                        {user: 'user1'},
                        {
                            $and: [
                                {valid: true},
                                {
                                    $or: [
                                        {reserved: false},
                                        {reserved: {$exists: false}},
                                    ],
                                },
                                {stock: 0},
                            ],
                        },
                    ],
                },
            },
            {
                $sort: {
                    stock: -1,
                    name: 1,
                },
            },
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });

    test('get available items for all users, sorted by name', () => {
        const pipeline = new ItemAggregationPipeline()
            .available()
            .sortByName(SortDirection.DESC);

        const expected = [
            {
                $match: {
                    $and: [
                        {valid: true},
                        {
                            $or: [
                                {reserved: false},
                                {reserved: {$exists: false}},
                            ],
                        },
                        {stock: 0},
                    ],
                },
            },
            {
                $sort: {
                    name: -1,
                },
            },
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
