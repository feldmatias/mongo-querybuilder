/* Schema
type Item = {
    name: string;
    stock: number;
};
*/

import {
    Count,
    GroupBy,
    MongoAggregationPipeline,
    MongoGroupBy,
    SortDirection,
    Sum,
} from '../../src';

function ItemStock(): MongoGroupBy {
    // Group items by name, count items and sum stock
    return GroupBy('name')
        .aggregate('count', Count())
        .aggregate('stock', Sum('stock'));
}

class ItemAggregationPipeline extends MongoAggregationPipeline {
    getStockByName(): this {
        return this.group(ItemStock());
    }
}

describe('Group By Example', () => {
    test('get stock for items by name', () => {
        const pipeline = new ItemAggregationPipeline().getStockByName();

        const expected = [
            {
                $group: {
                    _id: '$name',
                    count: {$sum: 1},
                    stock: {$sum: '$stock'},
                },
            },
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });

    test('get stock for items by name, sorted by count', () => {
        const pipeline = new ItemAggregationPipeline()
            .getStockByName()
            .sort('count', SortDirection.ASC);

        const expected = [
            {
                $group: {
                    _id: '$name',
                    count: {$sum: 1},
                    stock: {$sum: '$stock'},
                },
            },
            {
                $sort: {
                    count: 1,
                },
            },
        ];

        expect(pipeline.toMongo()).toEqual(expected);
    });
});
