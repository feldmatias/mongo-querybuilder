import {MongoMatcher} from '../index';

export class MongoOr extends MongoMatcher {
    private matchers: MongoMatcher[];

    constructor(...matchers: MongoMatcher[]) {
        super();
        this.matchers = matchers;
    }

    override or(...matchers: MongoMatcher[]): MongoOr {
        return new MongoOr(...this.matchers, ...matchers);
    }

    toMongo(): object {
        return {
            $or: this.matchers.map(matcher => matcher.toMongo()),
        };
    }
}

export function Or(...matchers: MongoMatcher[]): MongoOr {
    return new MongoOr(...matchers);
}
