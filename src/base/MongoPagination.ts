import {MongoAggregation} from '..';

export abstract class MongoPagination {
    abstract toAggregation(): MongoAggregation[];
}
