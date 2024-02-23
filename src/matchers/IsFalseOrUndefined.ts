import {Equals, IsFalse, MongoMatcher, NotExists} from '../index';

export class MongoIsFalseOrUndefined extends MongoMatcher {
    constructor(private field: string) {
        super();
    }

    override toMongo(): object {
        const query = IsFalse(this.field).or(NotExists(this.field));
        return query.toMongo();
    }
}

export function IsFalseOrUndefined(field: string): MongoIsFalseOrUndefined {
    return new MongoIsFalseOrUndefined(field);
}
