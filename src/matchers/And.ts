import {IMongoQuery, MongoMatcher} from '../index';

export class MongoAnd extends MongoMatcher {
    private matchers: MongoMatcher[];

    constructor(...matchers: MongoMatcher[]) {
        super();
        this.matchers = matchers;
    }

    override and(...matchers: MongoMatcher[]): MongoAnd {
        return new MongoAnd(...this.matchers, ...matchers);
    }

    toMongo(): IMongoQuery {
        return {
            $and: this.matchers.map(matcher => matcher.toMongo()),
        };
    }
}

export function And(...matchers: MongoMatcher[]): MongoAnd {
    return new MongoAnd(...matchers);
}
