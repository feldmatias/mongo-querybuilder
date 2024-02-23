import {MongoAggregation, MongoMatcher} from '../index';

export class MongoMatch extends MongoAggregation {
    constructor(private matcher: MongoMatcher) {
        super();
    }

    toMongo(): object {
        return {
            $match: this.matcher.toMongo(),
        };
    }
}

export function Match(matcher: MongoMatcher): MongoMatch {
    return new MongoMatch(matcher);
}
