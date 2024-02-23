import {IMongoValue, MongoMatcher} from '../index';

export class MongoExists extends MongoMatcher {
    constructor(private field: string) {
        super();
    }

    override toMongo(): object {
        return {
            [this.field]: {$exists: true},
        };
    }
}

export function Exists(field: string): MongoExists {
    return new MongoExists(field);
}
