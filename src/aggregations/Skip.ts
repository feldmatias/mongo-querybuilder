import {IMongoQuery, MongoAggregation} from '../index';

export class MongoSkip extends MongoAggregation {
    constructor(private skip: number) {
        super();
    }

    toMongo(): IMongoQuery {
        return {
            $skip: this.skip,
        };
    }
}

export function Skip(skip: number): MongoSkip {
    return new MongoSkip(skip);
}
