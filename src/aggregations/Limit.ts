import {IMongoQuery, MongoAggregation} from '../index';

export class MongoLimit extends MongoAggregation {
    constructor(private limit: number) {
        super();
    }

    toMongo(): IMongoQuery {
        return {
            $limit: this.limit,
        };
    }
}

export function Limit(limit: number): MongoLimit {
    return new MongoLimit(limit);
}
