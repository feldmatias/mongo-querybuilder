import {IMongoQuery, MongoMatcher} from '../index';

export class MongoNotExists extends MongoMatcher {
    constructor(private field: string) {
        super();
    }

    override toMongo(): IMongoQuery {
        return {
            [this.field]: {$exists: false},
        };
    }
}

export function NotExists(field: string): MongoNotExists {
    return new MongoNotExists(field);
}
