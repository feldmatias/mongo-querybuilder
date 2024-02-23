import {IMongoQuery, IMongoValue, MongoMatcher} from '../index';

export class MongoNotEquals extends MongoMatcher {
    constructor(
        private field: string,
        private value: IMongoValue
    ) {
        super();
    }

    override toMongo(): IMongoQuery {
        return {
            [this.field]: {
                $ne: this.value,
            },
        };
    }
}

export function NotEquals(field: string, value: IMongoValue): MongoNotEquals {
    return new MongoNotEquals(field, value);
}
