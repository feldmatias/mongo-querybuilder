import {MongoAnd, MongoOr} from '../index';

export abstract class MongoMatcher {
    abstract toMongo(): object;

    and(...matchers: MongoMatcher[]): MongoAnd {
        return new MongoAnd(this, ...matchers);
    }

    or(...matchers: MongoMatcher[]): MongoOr {
        return new MongoOr(this, ...matchers);
    }
}
