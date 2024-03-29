import {IMongoQuery, IMongoValue, MongoMatcher} from '../index';

export class MongoEquals extends MongoMatcher {
    constructor(
        private field: string,
        private value: IMongoValue
    ) {
        super();
    }

    override toMongo(): IMongoQuery {
        return {
            [this.field]: this.value,
        };
    }
}

export function Equals(field: string, value: IMongoValue): MongoEquals {
    return new MongoEquals(field, value);
}
