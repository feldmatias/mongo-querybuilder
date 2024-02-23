import {IMongoQuery, MongoAggregation} from '../index';

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

type IMongoSort = {
    field: string;
    direction: SortDirection;
};

export class MongoSort extends MongoAggregation {
    private sorts: IMongoSort[];

    constructor(field: string, direction: SortDirection) {
        super();
        this.sorts = [{field, direction}];
    }

    andSort(field: string, direction: SortDirection): MongoSort {
        const newSort = new MongoSort(field, direction);
        newSort.sorts = [...this.sorts, ...newSort.sorts];
        return newSort;
    }

    toMongo(): IMongoQuery {
        const sort: IMongoQuery = {};
        return {
            $sort: this.sorts.reduce((acc, sort) => {
                acc[sort.field] = this.getDirection(sort.direction);
                return acc;
            }, sort),
        };
    }

    private getDirection(direction: SortDirection): 1 | -1 {
        return direction === SortDirection.ASC ? 1 : -1;
    }
}

export function Sort(field: string, direction: SortDirection): MongoSort {
    return new MongoSort(field, direction);
}
