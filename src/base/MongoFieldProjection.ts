import {IMongoQuery} from './IMongoTypes';

export abstract class MongoFieldProjection {
    abstract toMongo(): IMongoQuery;
}
