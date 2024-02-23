import {Equals, MongoMatcher} from '../index';

export class MongoIsTrue extends MongoMatcher {
    constructor(private field: string) {
        super();
    }

    override toMongo(): object {
        return Equals(this.field, true).toMongo();
    }
}

export function IsTrue(field: string): MongoIsTrue {
    return new MongoIsTrue(field);
}
