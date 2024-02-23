import {Equals, IMongoQuery, MongoMatcher} from '../index';

export class MongoIsFalse extends MongoMatcher {
    constructor(private field: string) {
        super();
    }

    override toMongo(): IMongoQuery {
        return Equals(this.field, false).toMongo();
    }
}

export function IsFalse(field: string): MongoIsFalse {
    return new MongoIsFalse(field);
}
