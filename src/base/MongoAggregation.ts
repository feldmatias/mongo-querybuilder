import {IMongoQuery} from './IMongoTypes';

export abstract class MongoAggregation {
    abstract toMongo(): IMongoQuery;
}
